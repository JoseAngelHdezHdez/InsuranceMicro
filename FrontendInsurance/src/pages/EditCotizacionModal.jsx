import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditCotizacionModal = ({ show, onClose, poliza, onSubmit }) => {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!show || !poliza) return;

    const toLocalDateTime = (iso) => {
      if (!iso) return "";
      const d = new Date(iso);
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    setErrors({});
    setSaving(false);

    setForm({
      fechaInicio: toLocalDateTime(poliza.fechaInicio),
      fechaFin: toLocalDateTime(poliza.fechaFin),
      montoPrima: poliza.montoPrima ?? "",
      tipoPolizaID: poliza.tipoPolizaID ?? 1,
      names: poliza.names ?? "",
      fatherLastName: poliza.fatherLastName ?? "",
      motherLastName: poliza.motherLastName ?? "",
      email: poliza.email ?? "",
      phonenumber: poliza.phonenumber ?? "",
      age: poliza.age ?? "",
      contry: poliza.contry ?? "Mexico",
      gender: poliza.gender ?? "Male",
      estatus: poliza.estatus ?? "Cotizada",
    });
  }, [show, poliza]);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};

    if (!form.fechaInicio) e.fechaInicio = "Fecha inicio es requerida";
    if (!form.fechaFin) e.fechaFin = "Fecha fin es requerida";
    if (form.fechaInicio && form.fechaFin) {
      if (new Date(form.fechaInicio) >= new Date(form.fechaFin)) {
        e.fechaFin = "Fecha fin debe ser mayor que fecha inicio";
      }
    }

    const monto = Number(form.montoPrima);
    if (!form.montoPrima || Number.isNaN(monto) || monto <= 0) e.montoPrima = "MontoPrima debe ser mayor a 0";
    else {
      const parts = String(form.montoPrima).split(".");
      if (parts[1] && parts[1].length > 2) e.montoPrima = "Máximo 2 decimales";
    }

    if (!form.tipoPolizaID || Number(form.tipoPolizaID) <= 0) e.tipoPolizaID = "Tipo de póliza es requerido";

    if (!form.names?.trim()) e.names = "Nombre es requerido";
    if (!form.fatherLastName?.trim()) e.fatherLastName = "Apellido paterno es requerido";
    if (!form.motherLastName?.trim()) e.motherLastName = "Apellido materno es requerido";

    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 18 || age > 100) e.age = "Edad debe estar entre 18 y 100";

    if (!form.email?.trim()) e.email = "Email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido";

    if (!form.phonenumber?.trim()) e.phonenumber = "Teléfono es requerido";
    else if (!/^\+?\d{10,15}$/.test(form.phonenumber)) e.phonenumber = "Teléfono inválido (10 a 15 dígitos)";

    if (!form.contry?.trim()) e.contry = "País es requerido";
    if (!form.gender) e.gender = "Género es requerido";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      const payload = {
        polizaID: poliza.polizaID,
        fechaInicio: new Date(form.fechaInicio).toISOString(),
        fechaFin: new Date(form.fechaFin).toISOString(),
        montoPrima: Number(form.montoPrima),
        tipoPolizaID: Number(form.tipoPolizaID),
        names: form.names.trim(),
        fatherLastName: form.fatherLastName.trim(),
        motherLastName: form.motherLastName.trim(),
        email: form.email.trim(),
        phonenumber: form.phonenumber.trim(),
        age: Number(form.age),
        contry: form.contry.trim(),
        gender: form.gender,
        estatus: form.estatus,
      };

      await onSubmit(poliza.polizaID, payload);
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar la cotización.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar cotización</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!poliza ? (
          <div className="text-center py-4">Sin datos</div>
        ) : (
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha inicio</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.fechaInicio || ""}
                    onChange={(e) => setField("fechaInicio", e.target.value)}
                    isInvalid={!!errors.fechaInicio}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fechaInicio}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha fin</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.fechaFin || ""}
                    onChange={(e) => setField("fechaFin", e.target.value)}
                    isInvalid={!!errors.fechaFin}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fechaFin}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Monto prima</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={form.montoPrima ?? ""}
                    onChange={(e) => setField("montoPrima", e.target.value)}
                    isInvalid={!!errors.montoPrima}
                  />
                  <Form.Control.Feedback type="invalid">{errors.montoPrima}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Tipo de póliza</Form.Label>
                  <Form.Select
                    value={form.tipoPolizaID ?? 1}
                    onChange={(e) => setField("tipoPolizaID", e.target.value)}
                    isInvalid={!!errors.tipoPolizaID}
                  >
                    <option value={1}>Hogar</option>
                    <option value={2}>Vida</option>
                    <option value={3}>Auto</option>
                    <option value={4}>Salud</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.tipoPolizaID}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Estatus</Form.Label>
                  <Form.Control
                    value={form.estatus || ""}
                    disabled
                    onChange={(e) => setField("estatus", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Nombre(s)</Form.Label>
                  <Form.Control value={form.names || ""} onChange={(e) => setField("names", e.target.value)} isInvalid={!!errors.names} />
                  <Form.Control.Feedback type="invalid">{errors.names}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Apellido paterno</Form.Label>
                  <Form.Control value={form.fatherLastName || ""} onChange={(e) => setField("fatherLastName", e.target.value)} isInvalid={!!errors.fatherLastName} />
                  <Form.Control.Feedback type="invalid">{errors.fatherLastName}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Apellido materno</Form.Label>
                  <Form.Control value={form.motherLastName || ""} onChange={(e) => setField("motherLastName", e.target.value)} isInvalid={!!errors.motherLastName} />
                  <Form.Control.Feedback type="invalid">{errors.motherLastName}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Edad</Form.Label>
                  <Form.Control type="number" value={form.age ?? ""} onChange={(e) => setField("age", e.target.value)} isInvalid={!!errors.age} />
                  <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={5}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={form.email || ""} onChange={(e) => setField("email", e.target.value)} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control value={form.phonenumber || ""} onChange={(e) => setField("phonenumber", e.target.value)} isInvalid={!!errors.phonenumber} />
                  <Form.Control.Feedback type="invalid">{errors.phonenumber}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>País</Form.Label>
                  <Form.Control value={form.contry || ""} onChange={(e) => setField("contry", e.target.value)} isInvalid={!!errors.contry} />
                  <Form.Control.Feedback type="invalid">{errors.contry}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Género</Form.Label>
                  <Form.Select value={form.gender || "Male"} onChange={(e) => setField("gender", e.target.value)} isInvalid={!!errors.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving || !poliza}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCotizacionModal;
