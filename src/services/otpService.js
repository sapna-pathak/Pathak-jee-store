import axios from "axios";
import Otp from "@/models/otp.model.js";

// ✅ Generate OTP
export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// ✅ Generate Delivery OTP (6 digits)
export const generateDeliveryOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Send OTP via Nimbus
export const sendOtpSms = async (phone, otp) => {
  const message = `Your login OTP is ${otp} for mobile verification. This OTP is valid for 10 minutes. Please keep it confidential. Regards, KARMIC SECURITAS`;
  const user = process.env.NIMBUS_USER;
  const authkey = process.env.NIMBUS_API_KEY;
  const sender = process.env.NIMBUS_SENDER;

  if (!user || !authkey || !sender) {
    throw new Error(
      "Nimbus configuration is incomplete. Set NIMBUS_USER, NIMBUS_API_KEY, and NIMBUS_SENDER in your environment.",
    );
  }

  const params = new URLSearchParams({
    user,
    authkey,
    sender,
    mobile: phone,
    text: message,
    rpt: "1",
  });

  if (process.env.NIMBUS_ENTITY_ID) {
    params.set("entityid", process.env.NIMBUS_ENTITY_ID);
  }
  if (process.env.NIMBUS_TEMPLATE_ID) {
    params.set("templateid", process.env.NIMBUS_TEMPLATE_ID);
  }

  const url = `http://nimbusit.net/api/pushsms?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log("Nimbus SMS response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Nimbus SMS error:", error?.response?.data || error.message);
    throw new Error(
      "Failed to send OTP via Nimbus. Check that the sender ID matches your registered Nimbus sender.",
    );
  }
};

// ✅ Send Delivery verification OTP via Nimbus
export const sendDeliveryOtpSms = async (phone, otp, orderId) => {
  const message = `Your delivery verification OTP is ${otp} for Order #${orderId}. Please share it with the delivery executive to verify delivery. Regards, KARMIC SECURITAS`;
  const user = process.env.NIMBUS_USER;
  const authkey = process.env.NIMBUS_API_KEY;
  const sender = process.env.NIMBUS_SENDER;

  if (!user || !authkey || !sender) {
    throw new Error(
      "Nimbus configuration is incomplete. Set NIMBUS_USER, NIMBUS_API_KEY, and NIMBUS_SENDER in your environment.",
    );
  }

  const params = new URLSearchParams({
    user,
    authkey,
    sender,
    mobile: phone,
    text: message,
    rpt: "1",
  });

  if (process.env.NIMBUS_ENTITY_ID) {
    params.set("entityid", process.env.NIMBUS_ENTITY_ID);
  }
  if (process.env.NIMBUS_TEMPLATE_ID) {
    params.set("templateid", process.env.NIMBUS_TEMPLATE_ID);
  }

  const url = `http://nimbusit.net/api/pushsms?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log("Nimbus SMS delivery response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Nimbus SMS delivery error:", error?.response?.data || error.message);
    throw new Error("Failed to send delivery verification OTP via Nimbus.");
  }
};

// ✅ Save or update OTP
export const saveOtp = async (phone, otp) => {
  await Otp.findOneAndUpdate(
    { phone },
    { otp, createdAt: new Date() },
    { upsert: true },
  );
  console.log(`Saved OTP for ${phone}: ${otp}`);
};

// ✅ Verify OTP (checks AND deletes — used for login)
export const verifyOtpService = async (phone, otp) => {
  const record = await Otp.findOne({ phone });

  if (!record || record.otp !== otp) {
    return false;
  }

  await Otp.deleteOne({ phone });
  return true;
};

// ✅ Check OTP without deleting — used for signup so OTP survives a failed DB write
export const checkOtpService = async (phone, otp) => {
  const record = await Otp.findOne({ phone });
  if (!record || record.otp !== otp) {
    return false;
  }
  return true;
};

// ✅ Manually delete OTP after successful signup
export const deleteOtp = async (phone) => {
  await Otp.deleteOne({ phone });
};
