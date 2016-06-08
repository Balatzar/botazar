export default function funcBakeChannel(strChannel) {
  return function(strMsg) {
    rtm.sendMessage(strMsg, strChannel);
  };
}
