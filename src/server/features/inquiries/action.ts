"use server";

import { baseApi } from "../../base-api";

export async function submitContactForm(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message,
    subject: data.subject || "Website Enquiry",
    type: "General",
    enquiry: data.enquiry,
    area: data.area,
    budget: data.budget,
    source: data.source || "Contact Page",
  };

  const response = await baseApi.post("inquiries/contact", payload);

  if (!response?.success) {
    return { success: false, error: response?.message || "Something went wrong" };
  }

  return { success: true };
}
