export default function () {
  var url = new URL(document.URL);
  var socket = io({ path: url.pathname + "socket.io" });
  // socket.emit("my.topic", { data: input.value });
  // 客户端监听输入并显示

  return socket;
}