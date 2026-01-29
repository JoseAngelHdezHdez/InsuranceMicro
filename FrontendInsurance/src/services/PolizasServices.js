const PolizaGetAll = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_URL_API}/Poliza`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to fetch policies");
  }

  return await res.json();
};

const PolizaCreate = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_URL_API}/Poliza`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error creating poliza");
  }

  return await res.json();
};

const PolizaUpdate = async (id, payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_URL_API}/Poliza/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error updating poliza");
  }

  return await res.json();
};

const PolizaDelete = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_URL_API}/Poliza/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error deleting poliza");
  }

  return true;
};

const PolizaUpdateStatus = async (id, estatus) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_URL_API}/Poliza/${id}/estatus`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estatus }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error updating status");
  }

  return await res.json();
};

export { PolizaGetAll, PolizaCreate, PolizaUpdate, PolizaDelete, PolizaUpdateStatus };
