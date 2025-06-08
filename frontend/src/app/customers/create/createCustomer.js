"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (formData) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_customer_id = formData.get("customer_id");
  const creating_age = formData.get("age");
  const creating_gender = formData.get("gender");

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  const res = await fetch(`http://127.0.0.1:8000/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });
  if (!res.ok) {
    /*throw new Error("Failed to create customer");  一旦コメントアウト*/
    const errorData = await res.json();
    const message = errorData.detail || "顧客作成に失敗しました";
    throw new Error(message); // ★ 具体的な内容を throw  
  }

  revalidatePath(`/customers`);
};

export default createCustomer;
