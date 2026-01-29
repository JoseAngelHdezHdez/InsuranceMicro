const login = async (email, password) => {
  const res = await fetch(`${import.meta.env.VITE_URL_API}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("inforPersonal", JSON.stringify({name:data.name, email:data.email, role:data.roleID}));
  console.log(data)
  return data;
};

export { login };
