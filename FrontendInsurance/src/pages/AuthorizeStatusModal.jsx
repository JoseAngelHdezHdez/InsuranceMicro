import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AuthorizeStatusModal = ({ show, onClose, poliza, onSubmit }) => {
  const [estatus, setEstatus] = useState("Autorizada");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    // si ya tiene estatus de esos, precarga; si no, default Autorizada
    const current = poliza?.estatus;
    if (current === "Autorizada" || current === "Rechazada") setEstatus(current);
    else setEstatus("Autorizada");
    setSaving(false);
  }, [show, poliza]);

  const handleSave = async () => {
    if (!poliza?.polizaID) return;
    try {
      setSaving(true);
      await onSubmit(poliza.polizaID, estatus);
      onClose();
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el estatus.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Autorizar cotización</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <div className="fw-semibold">
            {poliza?.names} {poliza?.fatherLastName} {poliza?.motherLastName}
          </div>
          <div className="text-muted small">
            Póliza: <span className="fw-semibold">{poliza?.numeroPoliza}</span>
          </div>
        </div>

        <Form.Group>
          <Form.Label>Estatus</Form.Label>
          <Form.Select value={estatus} onChange={(e) => setEstatus(e.target.value)}>
            <option value="Autorizada">Autorizada</option>
            <option value="Rechazada">Rechazada</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving || !poliza}>
          {saving ? "Guardando..." : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthorizeStatusModal;
