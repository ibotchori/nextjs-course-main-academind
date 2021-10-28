// our-domain/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
    
  // this function receives data from NewMeetupForm component
  function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} /> // send addMeetupHandler function to NewMeetupForm with props
};

export default NewMeetupPage;
