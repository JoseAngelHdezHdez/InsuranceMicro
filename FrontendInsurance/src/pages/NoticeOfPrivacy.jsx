import { useEffect, useMemo, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { PolizaGetAll, PolizaCreate, PolizaUpdate, PolizaDelete, PolizaUpdateStatus } from "../services/PolizasServices";
import CreateCotizacionModal from "./CreateCotizacionModal";
import EditCotizacionModal from "./EditCotizacionModal";
import AuthorizeStatusModal from "./AuthorizeStatusModal";

const NoticeOfPrivacy = () => {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAuthorize, setShowAuthorize] = useState(false);
  const [selectedPoliza, setSelectedPoliza] = useState(null);

  const GetPolizas = async () => {
    try {
      setLoading(true);
      const data = await PolizaGetAll();
      const list = Array.isArray(data) ? data : (data?.result ?? []);
      setPolizas(list);
    } catch (error) {
      console.error("Error fetching policies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPolizas();
  }, []);

  const rows = useMemo(() => {
    return polizas.map((p) => ({
      id: p.polizaID,
      nombre: `${p.names ?? ""} ${p.fatherLastName ?? ""} ${p.motherLastName ?? ""}`.trim(),
      email: p.email ?? "",
      phone: p.phonenumber ?? "",
      monto: typeof p.montoPrima === "number" ? p.montoPrima : Number(p.montoPrima || 0),
      estado: p.estatus ?? "",
    }));
  }, [polizas]);

  const onEdit = (poliza) => {
    setSelectedPoliza(poliza);
    setShowEdit(true);
  };

  const onDelete = async (id) => {
    const ok = window.confirm("¿Seguro que quieres eliminar esta cotización?");
    if (!ok) return;
  
    try {
      await PolizaDelete(id);
      await GetPolizas();
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar.");
    }
  };

  const onAuthorize = (id) => {
    const poliza = polizas.find(p => p.polizaID === id); // usa tu array original
    setSelectedPoliza(poliza);
    setShowAuthorize(true);
  };

  return (
    <div>
      <h3
        style={{
          padding: "2rem",
          background: "linear-gradient(to right, #e4007f, #ffc0cb)",
          color: "white",
          textAlign: "center",
          marginBottom: 0,
        }}
      >
        Cotizaciones de Seguros
      </h3>

      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Cotizaciones</h5>

          <Button variant="primary" onClick={() => setShowCreate(true)}>
            Crear nueva cotización
          </Button>
        </div>

        <div className="table-responsive">
          <Table striped hover bordered className="align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th className="text-end">Monto prima</th>
                <th className="text-center">Estado</th>
                <th className="text-center" style={{ width: 120 }}>
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Cargando...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No hay cotizaciones.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.nombre}</td>
                    <td>{r.email}</td>
                    <td>{r.phone}</td>
                    <td className="text-end">
                      {r.monto.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                    </td>
                    <td className="text-center">{r.estado}</td>
                    <td className="text-center">
                      {r.estado !== "Cotizada" ? null : (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                          onClick={() => onEdit(polizas.find((p) => p.polizaID === r.id))}
                          title="Editar"
                        >
                          <i className="bi bi-pencil-square" />
                        </Button>
                      )}

                      {r.estado === "Cotizada" && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(r.id)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash" />
                        </Button>
                      )}

                      {r.estado !== "Cotizada" ? null : (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => onAuthorize(r.id)}
                          title="Autorizar"
                        >
                          <i className="bi bi-key" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Container>
      <CreateCotizacionModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={async (payload) => {
          await PolizaCreate(payload);   // aquí sí llamas el servicio
          await GetPolizas();            // recargas tabla
          setShowCreate(false);          // cierras modal
        }}
      />
      <EditCotizacionModal
        show={showEdit}
        poliza={selectedPoliza}
        onClose={() => {
          setShowEdit(false);
          setSelectedPoliza(null);
        }}
        onSubmit={async (id, payload) => {
          await PolizaUpdate(id, payload);  // tu servicio
          await GetPolizas();               // recarga tabla
          setShowEdit(false);
          setSelectedPoliza(null);
        }}
      />
      <AuthorizeStatusModal
       show={showAuthorize}
       poliza={selectedPoliza}
       onClose={() => {
         setShowAuthorize(false);
         setSelectedPoliza(null);
       }}
       onSubmit={async (id, estatus) => {
         await PolizaUpdateStatus(id, estatus); // servicio
         await GetPolizas();                   // recarga tabla
       }}
     />
    </div>
  );
};

export default NoticeOfPrivacy;
