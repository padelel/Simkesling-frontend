"use client";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Row,
  notification,
  Space,
} from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const Notif = (
  type: NotificationType,
  message: string = "",
  description: string = ""
) => {
  notification[type]({
    message,
    description,
  });
};
export default Notif;
