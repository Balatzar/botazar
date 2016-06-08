import Channel from "../models/Channel";
import User    from "../models/User";
import Im      from "../models/Im";

export default function(rtmStartData) {
  console.log("init");

  User.model.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else if (users.length) {
      return;
    } else {
      rtmStartData.users.forEach(u => User.createUser(u));
      rtmStartData.channels.forEach(c => Channel.createChannel(c));
      rtmStartData.ims.forEach(i => Im.createIm(i));
      console.log("Team data stored");
    }
  });

};
