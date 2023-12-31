import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface Tarea {
  nombre: string;
  terminada: boolean;
}

function App() {
  const [nuevaTarea, setNuevaTarea] = useState<string>("");
  const [Tareas, setTareas] = useState<any>([]);
  const [CantidadTareasTerminadas, setCantidadTareasTerminadas] =
    useState<number>(0);
  const [CantidadTareasPendientes, setCantidadTareasPendientes] =
    useState<number>(0);

  useEffect(() => {
    const ListaPendientes: number = Tareas.filter(
      (t: Tarea) => t.terminada === false
    ).length;

    setCantidadTareasPendientes(ListaPendientes);

    setCantidadTareasTerminadas(Tareas.length - ListaPendientes);
  }, [Tareas]);

  const TareasTerminadas = (ParametroTarea: Tarea) => {
    setTareas(
      Tareas.map((tarea: Tarea) => {
        if (tarea.nombre === ParametroTarea.nombre) {
          return { nombre: tarea.nombre, terminada: !tarea.terminada };
        }
        return tarea;
      })
    );
  };

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    if (nuevaTarea.length > 0) {
      setTareas([...Tareas, { nombre: nuevaTarea, terminada: false }]);
      setNuevaTarea("");
      console.log(Tareas);
    }
  };

  return (
    <>
      <div className="Container">
        <h1> TODO LIST </h1>
        <form onSubmit={HandleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              style={{ height: "70px" }}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
            />
            <Button
              style={{ width: "200px" }}
              disabled={Tareas.some(
                (tarea: Tarea) => tarea.nombre === nuevaTarea
              )}
              type="submit"
              variant="secondary"
            >
              Agregar
            </Button>
          </InputGroup>
        </form>

        {/*------------------------------------------------------------------------*/}

        <div className="ContainerCantidadTareas">
          <p className="ContadorTareasTerminadas">
            Tareas Terminadas : {CantidadTareasTerminadas}
          </p>
          <p className="ContadorTareasPendientes">
            Tareas Pendientes : {CantidadTareasPendientes}
          </p>
        </div>

        {Tareas.map((tarea: Tarea, index: number) => (
          <div className="ContainerTarea" key={index}>
            <Form.Check>
              <Form.Check.Input
                style={{ width: "40px", height: "40px" }}
                checked={tarea.terminada}
                onChange={() => TareasTerminadas(tarea)}
                isValid
              />
            </Form.Check>
            {tarea.terminada ? (
              <p className="TareaTerminada">{tarea.nombre}</p>
            ) : (
              <p className="TareaPendiente">{tarea.nombre}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
