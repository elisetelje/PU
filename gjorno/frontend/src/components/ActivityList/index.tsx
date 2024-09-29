import moment from "moment";
import "moment/locale/nb";
import IActivity from "../../interfaces/activity";
import IAuthor from "../../interfaces/author";
import Activity from "../Activity";

interface Props {
  activities: IActivity[];
  currentUser: IAuthor;
}

const ActivityList: React.FC<Props> = ({ activities, currentUser }) => {
  return (
    <div id="activities">
      {activities &&
        activities.length > 0 &&
        activities.map((item) => (
          <Activity
            key={item.id}
            activity={{
              ...item,
              created: moment(item.created).format("Do MMMM YYYY, HH:mm"),
              date: moment(item.date).format("Do MMMM YYYY, HH:mm"),
            }}
            currentUser={currentUser}
          />
        ))}
    </div>
  );
};

export default ActivityList;
