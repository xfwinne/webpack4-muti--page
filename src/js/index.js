import "@/styles/home.scss";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { name, fn } from "@/utils/tools.js";

/**
 *
 * 下面代码都是在测试es6-es10等语法是否能正确编译，浏览器能否正常访问；
 * 测试jq是否能使用
 *
 */
const data = new Promise((resolve) => {
  console.log("index page");
  resolve("index data");
});
data.then((res) => {
  console.log(res);
});
console.log(name);
// conosle1.log(0);
fn();

function getSomething() {
  return "normal function";
}
async function testAsync() {
  return Promise.resolve("async function");
}

async function test() {
  const v1 = await getSomething(); // await后面跟普通函数
  const v2 = await testAsync();    // await后面跟async函数
  console.log(v1);
  console.log(v2);
}

test();
// 最后输出：
// normal function
// async function


$("#btn").click(() => {
  console.log("click btn index");
});
