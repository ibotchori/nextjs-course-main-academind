/* Meetup Detail Page */

import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

// Get data fom getStaticProps function with props
const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        description={props.meetupData.description}
        address={props.meetupData.address}
        title={props.meetupData.title}
        image={props.meetupData.image}
      />
    </Fragment>
  );
};

/* Generate array of path dynamically */
export async function getStaticPaths() {
  /*Get data from mongo database */

  // Connect to mongodb cluster
  const client = await MongoClient.connect(
    "mongodb+srv://user:nP0WHombYLsf7ocx@cluster0.ynjjr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  // Call db method on the client object
  const db = client.db();

  // Access to collection
  const meetupCollection = db.collection("meetups");

  // get data from mondo database (get only _id property from all object, first argument {} = all documents)
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  // Close database connection
  client.close();
  return {
    fallback: 'blocking', // show 404 error page if no route found
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}


// get data from mongo database before component load, and send data to component with props
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  /*Get data from mongo database */

  // Connect to mongodb cluster
  const client = await MongoClient.connect(
    "mongodb+srv://user:nP0WHombYLsf7ocx@cluster0.ynjjr.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  // Call db method on the client object
  const db = client.db();

  // Access to collection
  const meetupCollection = db.collection("meetups");

  // get data (single meetup) from mondo database (get only object, findOne() = one single document)
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId), // change automatically generated id (mongodb) with meetupId extracted from params (convert it to ObjetId, to communicate with mongodb id)
  }); 

  // Close database connection
  client.close();

  return {
    props: {
      meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description
      }
    },
  };
}

export default MeetupDetails;
