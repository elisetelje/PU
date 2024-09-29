import React, { useEffect, useState } from "react";
import axios from "../axios";
import ActivityList from "../components/ActivityList";
import IActivity from "../interfaces/activity";
import IAuthor from "../interfaces/author";
import "./../App.css";

function ActivityLog() {
  const [currentUser, setCurrentUser] = useState<IAuthor>();
  const [activities, setActivities] = useState<IActivity[]>([]);

  async function fetchData() {
    const request = await axios.get("activities/", {
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
    });
    setActivities(request.data);
    return;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentUser = async () => {
    try {
      await axios
        .get("userprofiles/", {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.data[0]) {
            setCurrentUser({
              id: res.data[0].id,
              is_organization: res.data[0].is_organization,
              user: res.data[0].user,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let activitiesToShow = activities;
  activitiesToShow = activities.filter((item) => {
    console.log(item.participants);
    return (
      item.author?.user.username === currentUser?.user.username ||
      item.participants?.find((p) => p.id === currentUser?.id)
    );
  });

  return (
    <div>
      <h2>Din Aktivitetslogg</h2>
      <div id="activities">
        {currentUser && (
          <ActivityList
            currentUser={currentUser}
            activities={activitiesToShow}
          />
        )}
      </div>
    </div>
  );
}

export default ActivityLog;
