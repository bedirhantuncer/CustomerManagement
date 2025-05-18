import { useState } from "react";

export default function CustomerManagement() {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    identityNumber: "",
    registeredAt: "",
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const baseUrl = "http://localhost:9090/api";

  const fetchCustomers = async () => {
    const response = await fetch(`${baseUrl}/customers`, {
      headers: {
        Authorization: "Basic " + btoa(`${auth.username}:${auth.password}`),
      },
    });
    const data = await response.json();
    setCustomers(data);
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${baseUrl}/customers`, {
        headers: {
          Authorization: "Basic " + btoa(`${auth.username}:${auth.password}`),
        },
      });
      if (res.ok) {
        setIsLoggedIn(true);
        fetchCustomers();
      } else {
        alert("Giriş başarısız");
      }
    } catch {
      alert("Sunucuya bağlanılamadı");
    }
  };

  const handleLogout = () => {
    setAuth({ username: "", password: "" });
    setIsLoggedIn(false);
    setCustomers([]);
    setNewCustomer({
      firstName: "",
      lastName: "",
      identityNumber: "",
      registeredAt: "",
    });
    setPasswordChange({ oldPassword: "", newPassword: "" });
  };

  const validateForm = () => {
    const { firstName, lastName, identityNumber, registeredAt } = newCustomer;
    if (!firstName || !lastName || !identityNumber || !registeredAt) {
      alert("Tüm alanlar zorunludur.");
      return false;
    }
    if (!/^\d{11}$/.test(identityNumber)) {
      alert("TC Kimlik No 11 haneli olmalıdır.");
      return false;
    }
    return true;
  };

  const handleAddOrUpdateCustomer = async () => {
    if (!validateForm()) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${baseUrl}/customers/${editingId}`
      : `${baseUrl}/customers`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${auth.username}:${auth.password}`),
      },
      body: JSON.stringify(newCustomer),
    });

    if (res.ok) {
      setNewCustomer({
        firstName: "",
        lastName: "",
        identityNumber: "",
        registeredAt: "",
      });
      setEditingId(null);
      fetchCustomers();
    } else {
      alert("İşlem başarısız oldu");
    }
  };

  const handleEdit = (customer) => {
    setNewCustomer({
      firstName: customer.firstName,
      lastName: customer.lastName,
      identityNumber: customer.identityNumber,
      registeredAt: customer.registeredAt,
    });
    setEditingId(customer.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu müşteriyi silmek istiyor musunuz?");
    if (!confirmDelete) return;

    const res = await fetch(`${baseUrl}/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(`${auth.username}:${auth.password}`),
      },
    });
    if (res.ok) {
      fetchCustomers();
    } else {
      alert("Silme işlemi başarısız oldu");
    }
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword } = passwordChange;
    if (!oldPassword || !newPassword) {
      alert("Şifre alanları boş bırakılamaz");
      return;
    }

    const res = await fetch(`${baseUrl}/user/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${auth.username}:${auth.password}`),
      },
      body: JSON.stringify({
        username: auth.username,
        oldPassword,
        newPassword,
      }),
    });

    const text = await res.text();
    if (res.ok) {
      alert("Şifre başarıyla değiştirildi");
      setPasswordChange({ oldPassword: "", newPassword: "" });
    } else {
      alert(text || "Şifre değiştirilemedi");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-20 space-y-4">
        <h2 className="text-xl font-bold text-center">Giriş Yap</h2>
        <input
          className="border p-2 w-full"
          placeholder="Kullanıcı Adı"
          value={auth.username}
          onChange={(e) => setAuth({ ...auth, username: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Şifre"
          value={auth.password}
          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Giriş Yap
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {editingId ? "Müşteri Güncelle" : "Yeni Müşteri Ekle"}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="space-y-2">
        <input className="border p-2 w-full" placeholder="Ad" value={newCustomer.firstName}
          onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Soyad" value={newCustomer.lastName}
          onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })} />
        <input className="border p-2 w-full" placeholder="TC Kimlik No" value={newCustomer.identityNumber}
          onChange={(e) => setNewCustomer({ ...newCustomer, identityNumber: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Kayıt Tarihi (YYYY-MM-DD)" value={newCustomer.registeredAt}
          onChange={(e) => setNewCustomer({ ...newCustomer, registeredAt: e.target.value })} />
        <button onClick={handleAddOrUpdateCustomer}
          className="bg-green-600 text-white p-2 w-full rounded">
          {editingId ? "Güncelle" : "Müşteri Ekle"}
        </button>
      </div>

      <h2 className="text-2xl font-bold mt-10">Kayıtlı Müşteriler</h2>
      <div className="space-y-2">
        {customers.map((c) => (
          <div key={c.id} className="border p-2 rounded">
            <div>
              <strong>{c.firstName} {c.lastName}</strong><br />
              TC: {c.identityNumber}<br />
              Tarih: {c.registeredAt}
            </div>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(c)}
                className="bg-yellow-500 text-white px-3 py-1 rounded">
                Düzenle
              </button>
              <button onClick={() => handleDelete(c.id)}
                className="bg-red-600 text-white px-3 py-1 rounded">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10">Şifre Değiştir</h2>
      <div className="space-y-2">
        <input type="password" className="border p-2 w-full" placeholder="Eski Şifre"
          value={passwordChange.oldPassword}
          onChange={(e) => setPasswordChange({ ...passwordChange, oldPassword: e.target.value })} />
        <input type="password" className="border p-2 w-full" placeholder="Yeni Şifre"
          value={passwordChange.newPassword}
          onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })} />
        <button onClick={handleChangePassword}
          className="bg-indigo-600 text-white p-2 w-full rounded">
          Şifreyi Güncelle
        </button>
      </div>
    </div>
  );
}
