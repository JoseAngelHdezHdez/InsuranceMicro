import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const defaultForm = {
  fechaInicio: "",
  fechaFin: "",
  montoPrima: "",
  tipoPolizaID: 1,
  names: "",
  fatherLastName: "",
  motherLastName: "",
  email: "",
  phonenumber: "",
  age: "",
  contry: "Mexico",
  gender: "Male",
};

const CreateCotizacionModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // reset al abrir/cerrar
  useEffect(() => {
    if (show) {
      setForm(defaultForm);
      setErrors({});
      setSaving(false);
    }
  }, [show]);

  const validate = () => {
    const e = {};

    if (!form.fechaInicio) e.fechaInicio = "Fecha inicio es requerida";
    if (!form.fechaFin) e.fechaFin = "Fecha fin es requerida";

    if (form.fechaInicio && form.fechaFin) {
      const ini = new Date(form.fechaInicio);
      const fin = new Date(form.fechaFin);
      if (ini >= fin) e.fechaFin = "Fecha fin debe ser mayor que fecha inicio";
    }

    const monto = Number(form.montoPrima);
    if (!form.montoPrima || Number.isNaN(monto) || monto <= 0) {
      e.montoPrima = "MontoPrima debe ser mayor a 0";
    } else {
      // max 2 decimales
      const parts = String(form.montoPrima).split(".");
      if (parts[1] && parts[1].length > 2) e.montoPrima = "Máximo 2 decimales";
    }

    if (!form.tipoPolizaID || Number(form.tipoPolizaID) <= 0) e.tipoPolizaID = "Tipo de póliza es requerido";

    if (!form.names.trim()) e.names = "Nombre es requerido";
    if (!form.fatherLastName.trim()) e.fatherLastName = "Apellido paterno es requerido";
    if (!form.motherLastName.trim()) e.motherLastName = "Apellido materno es requerido";

    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 18 || age > 100) e.age = "Edad debe estar entre 18 y 100";

    if (!form.email.trim()) e.email = "Email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido";

    if (!form.phonenumber.trim()) e.phonenumber = "Teléfono es requerido";
    else if (!/^\+?\d{10,15}$/.test(form.phonenumber)) e.phonenumber = "Teléfono inválido (10 a 15 dígitos)";

    if (!form.contry.trim()) e.contry = "País es requerido";
    if (!form.gender) e.gender = "Género es requerido";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      // Payload para backend
      const payload = {
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
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
      };

      // onCreate lo mandas desde la pantalla (para pegarle al servicio real)
      await onCreate(payload);

      onClose();
      onCreated?.(); // recargar tabla
    } catch (err) {
      console.error(err);
      alert("No se pudo crear la cotización.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Crear nueva cotización</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha inicio</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={form.fechaInicio}
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
                  value={form.fechaFin}
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
                  inputMode="decimal"
                  step="0.01"
                  value={form.montoPrima}
                  onChange={(e) => setField("montoPrima", e.target.value)}
                  isInvalid={!!errors.montoPrima}
                  placeholder="1500.00"
                />
                <Form.Control.Feedback type="invalid">{errors.montoPrima}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Tipo de póliza</Form.Label>
                <Form.Select
                  value={form.tipoPolizaID}
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
                <Form.Control value="Cotizada" disabled />
                <Form.Text className="text-muted">Se asigna automáticamente</Form.Text>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control
                  value={form.names}
                  onChange={(e) => setField("names", e.target.value)}
                  isInvalid={!!errors.names}
                />
                <Form.Control.Feedback type="invalid">{errors.names}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Apellido paterno</Form.Label>
                <Form.Control
                  value={form.fatherLastName}
                  onChange={(e) => setField("fatherLastName", e.target.value)}
                  isInvalid={!!errors.fatherLastName}
                />
                <Form.Control.Feedback type="invalid">{errors.fatherLastName}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Apellido materno</Form.Label>
                <Form.Control
                  value={form.motherLastName}
                  onChange={(e) => setField("motherLastName", e.target.value)}
                  isInvalid={!!errors.motherLastName}
                />
                <Form.Control.Feedback type="invalid">{errors.motherLastName}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  value={form.age}
                  onChange={(e) => setField("age", e.target.value)}
                  isInvalid={!!errors.age}
                />
                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  isInvalid={!!errors.email}
                  placeholder="correo@dominio.com"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  value={form.phonenumber}
                  onChange={(e) => setField("phonenumber", e.target.value)}
                  isInvalid={!!errors.phonenumber}
                  placeholder="5579554466"
                />
                <Form.Control.Feedback type="invalid">{errors.phonenumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>País</Form.Label>
                <Form.Control
                  value={form.contry}
                  onChange={(e) => setField("contry", e.target.value)}
                  isInvalid={!!errors.contry}
                />
                <Form.Control.Feedback type="invalid">{errors.contry}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Género</Form.Label>
                <Form.Select
                  value={form.gender}
                  onChange={(e) => setField("gender", e.target.value)}
                  isInvalid={!!errors.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            if (!validate()) return;
        
            const payload = {
              fechaInicio: form.fechaInicio,
              fechaFin: form.fechaFin,
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
            };
        
            await onSubmit(payload);
          }}
        >
          Guardar cotización
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCotizacionModal;
