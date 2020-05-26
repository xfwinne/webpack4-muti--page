/* eslint-disable no-undef */
import "../styles/member.scss";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { fn } from "@/utils/tools.js";

const data = new Promise((resolve) => {
  console.log("member 666");
  resolve("member data");
});
data.then((res) => {
  console.log(res);
});
fn();
$("#btn").click(() => {
  console.log("click btn member");
});
