// our-domain/
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// Pre rendering the page with data that's receive form database
export async function getStaticProps() {
  /*Get data from mongo database */

  // Connect to mongodb cluster
  const client = await MongoClient.connect(
    "mongodb+srv://irakli:irakli83@cluster0.xvnnn.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  // Call db method on the client object
  const db = client.db();

  // Access to collection
  const meetupCollection = db.collection("meetups");

  // get data form mondo database
  const meetups = await meetupCollection.find().toArray();

  // Close database connection
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // pre render page after request is come. every 1 second.
    revalidate: 1,
  };
}

export default HomePage;
