import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/infoBancaria.css";
function InfoBancaria() {
    const [mostrarForm, setMostrarForm] = useState(false);
    const [cuentasBancarias, setCuentasBancarias] = useState([]);
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [nombreCuentaBancaria, setNombreCuentaBancaria] = useState("");
    const [pais, setPais] = useState("");
    const [monedaDePago, setMonedaDePago] = useState("EUR");
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null)
    const [mostrarMoneda, setMostrarMoneda] = useState(() => {
      const width = window.innerWidth;
      return width > 895;
    });
    const actualizarNumeroCuenta = (event) => {
        setNumeroCuenta(event.target.value);
    }
    const actualizarNombreCuentaBancaria = (event) => {
        setNombreCuentaBancaria(event.target.value);
    }
    const actualizarPais = (event) => {
        setPais(event.target.value);
    }
    const actualizarMonedaDePago = (event) => {
        setMonedaDePago(event.target.value);
    }
    const actualizarInfoBancaria = async (event) => {
      event.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const nuevaCuenta = {
          id: Date.now(),
          numero_cuenta: numeroCuenta, 
          titular: nombreCuentaBancaria,
          pais: pais, 
          moneda: monedaDePago,
          token: token,
        };
       
    const response = await fetch('http://localhost:5000/api/bankInfo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaCuenta)
    });
    if (response.ok) {
      const nuevasCuentas = [...cuentasBancarias, nuevaCuenta];
      setCuentasBancarias(nuevasCuentas);
      localStorage.setItem('userInfoBancaria', JSON.stringify(nuevasCuentas));
      setNumeroCuenta("");
      setNombreCuentaBancaria("");
      setPais("");
      setMonedaDePago("EUR");
      setMostrarForm(false);
    }
  } catch (error) {
    console.error("error interno: ", error);
  }      
    }
    const eliminarCuentaBancaria = async (numero_cuenta) => {
      try {
        const response = await fetch('http://localhost:5000/api/bankInfo', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({numero_cuenta})
        });
        if (response.ok) {
          const arrayFiltrado = cuentasBancarias.filter(c => c.numero_cuenta !== numero_cuenta)
        setCuentasBancarias(arrayFiltrado);
        localStorage.setItem('userInfoBancaria', JSON.stringify(arrayFiltrado));
        }
      } catch (error) {
        console.error("error al borrar cuenta: ", error);
      }
    }
    const seleccionarCuentaBancaria = async (cuenta) => {
      try {
        const response = await fetch('http://localhost:5000/api/bankInfo/selected', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numero_cuenta: cuenta.numero_cuenta })
        });
        if (response.ok) {
          setCuentaSeleccionada(cuenta);
      const cuentaSeleccionadaActualizar = localStorage.setItem("userCuentaBancaria", JSON.stringify(cuenta.nombre))
        }
      } catch (error) {
        console.error("error al seleccionar cuenta: ", error);
      }
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/api/bankInfo/filterByToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token})
        });
        if (response.ok) {
          const data = await response.json();
          setCuentasBancarias(data);
          localStorage.setItem("userInfoBancaria", JSON.stringify(data));
          const cuentaSeleccionada = data.find(cuenta => cuenta.seleccionada === true);
          if (cuentaSeleccionada) {
            setCuentaSeleccionada(cuentaSeleccionada);
          localStorage.setItem("userCuentaBancaria", JSON.stringify(cuentaSeleccionada));
          }
        }
      } catch (error) {
        console.error("error al cargar las cuentas bancarias", error);
      }
      }
      fetchData();
      const handleResize = () => {
        const width = window.innerWidth;
        setMostrarMoneda(width > 845);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
      }, []);
    return (
        <div className="div-sidebar-element-infoBancaria">
        <button className="nueva-cuenta" onClick={() => mostrarForm ? setMostrarForm(false) : setMostrarForm(true)}>Añadir cuenta</button>
         <form className={mostrarForm ? "mostrar-form" : "no-mostrar-form"} onSubmit={actualizarInfoBancaria}>
            <input 
            type="text" 
            value={numeroCuenta} 
            onChange={actualizarNumeroCuenta}
            placeholder="numero de cuenta"
          />
              <input 
                type="text" 
                value={nombreCuentaBancaria} 
                onChange={actualizarNombreCuentaBancaria}
                placeholder="dueño de cuenta bancaria"
              />
              <input 
              type="text" 
              value={pais} 
              onChange={actualizarPais}
              placeholder="Pais de residencia"
            />
            <select
            value={monedaDePago} 
            onChange={actualizarMonedaDePago}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
          </select>
              <button type="submit" className="nuevo-proyecto">guardar cambios</button>
            </form>
        
            <div className="cuentasBancarias">
              <ul>
                {cuentasBancarias.map((cuenta) => (
                  <li onClick={() => seleccionarCuentaBancaria(cuenta)} key={cuenta.titular}>
                    <div className="texto-campos-perfil">
                      <input type='text' readOnly value={cuenta.numero_cuenta} />
                      <input type='text' value={cuenta.titular} readOnly />
                      <input id="pais" type='text' value={cuenta.pais} readOnly />
                      {mostrarMoneda ? (
                        <input id="moneda" type='text' value={cuenta.moneda} readOnly />
                      ) : (
                        console.log(monedaDePago)
                      )}
                  <button onClick={() => eliminarCuentaBancaria(cuenta.numero_cuenta)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 512 512">
                      <path fill="#EF4823" d="M388.9,372.5c-0.8-0.3-1.6-0.7-2.3-1.3c-11.7-9.4-20.2-22.2-28.8-34.3c-8.9-12.6-19.1-24.1-28.8-36.1c-5.2-6.4-10.2-12.9-15.2-19.5c-3.2-5.8-6.6-11.5-10.1-17.2c2-3.4,3.9-6.8,5.7-10.3c0,0.1,0.1,0.1,0.1,0.2c9.9-13.7,20-27.3,30.6-40.5c18.8-23.5,38.1-46.5,56.5-70.2c-18.8-24.5-36.7-49.6-51.9-76.4c-4.3,8.9-8.1,18-11.7,27.2c-6.2,15.8-12.8,31.4-20.5,46.6c-10.9,21.6-22.6,43-35.1,63.8l0.4,0.7c-0.9,1.2-1.8,2.4-2.7,3.6c-1.9,2-3.8,3.9-5.6,5.8c-2.6-4-5.2-8.1-7.9-12.1c-0.4-0.6-0.7-1.1-1.1-1.7c-16-26.8-31.3-54.1-45.7-81.8c-5.5-10.6-11.8-20.8-17.7-31.3c-4.9-8.7-10.7-18.1-13.1-27.9c-20,10.8-39.7,23-55.5,39.4c3,1.6,5.8,3.5,8.4,5.7c9.8,8.2,17.5,18.7,25.3,28.8c8.7,11.3,17.9,22.1,26.7,33.2c18.1,23,35.3,46.6,53.2,69.8c0.1-0.1,0.2-0.3,0.3-0.4c2.4,3.6,4.8,7.2,7.6,10.4c-0.7,1.3-1.4,2.7-2.1,4c-1.7,2.5-3.3,5-4.9,7.5c-0.1-0.1-0.2-0.2-0.3-0.4c-14.6,20.6-30.2,40.4-47,59.2c-17.1,19.3-35.4,41.5-58.2,54.7c0.6,1.3,0.7,2.8,0.3,4.1c9,9.2,21.1,15.2,29.6,25c7.9,9,14.9,18.8,23,27.6c8.3-22.3,21.9-42.6,36-61.7c14.1-19.1,28.7-37.9,42.8-57c2.5-2.9,4.8-6,7.1-9.1c2.6-2.9,5.3-5.7,7.6-8.7c4.1,4.4,7.9,9,12.4,13c9.7,12.6,19,25.4,27.6,38.7c17.8,27.6,30.2,58,46.3,86.6c9.5-16.3,20.3-32.5,25.4-50.6c-1.8-1.2-3.5-2.8-5.4-4.6C389.7,374.2,389.2,373.4,388.9,372.5z"></path><path d="M389.5,356.8c0,0-0.1,0-0.1,0c-8-7.9-14.4-17.3-20.9-26.5c-8.9-12.7-19-24.1-28.8-36.1c-7.8-9.6-15.3-19.4-22.5-29.4c10.4-14.4,20.9-28.8,32-42.7c19.9-24.9,40.4-49.3,59.9-74.5c1.6-2.1,2.6-5.3,0.8-7.6c-21.2-27.5-41.5-55.8-58.1-86.3c0.1-0.2,0.2-0.4,0.3-0.5c-1.6-2.7-3-5.6-4.3-8.5c-0.7-1.2-1.3-2.3-2-3.5c-0.1,0.1-0.3,0.1-0.4,0.2c-1.5,0.8-2.8,1.6-4.1,2.4c-0.3,0.1-0.5,0.2-0.8,0.3c-1.2,4.2-2.9,8.4-5.1,12.1c0.1,0.2,0.2,0.3,0.3,0.5c-12.4,23.8-20.3,50-32.2,74.1c-10.3,20.8-21.5,41.3-33.4,61.4c-14.8-24.9-28.9-50.1-42.3-75.7c-2.8-5.4-5.8-10.7-8.8-16.1c-4.9-6.8-9.2-14-12.4-21.7c-2.8-4.8-5.6-9.8-7.8-14.9c-3.7-6.3-6.8-12.8-10-19.3c-1.2-0.1-2.4,0.1-3.7,0.7c-24,12.5-47.8,26.7-66.5,46.5c-1.2,1.3-1.7,2.8-1.7,4.2c4.9,6.6,9.6,13.4,14.1,20.2c5.7,5,10.5,11.2,15,16.9c8,10.1,16.3,20.1,24.2,30.2c11.3,14.4,22.7,28.8,33.9,43.3c10.4,13.6,20.3,27.6,30.8,41.1c-14,20-29.2,39.3-45.3,57.7c-9.7,11.1-19.8,22.1-30.2,32.6c-8.9,9-18.5,17.5-29.5,23.8c-0.2,0.1-0.5,0.2-0.7,0.3l-6.1,3.2c-4.1,2.1-3.8,6.3-1.4,9c0.1,1,0.4,2,0.9,2.8c8.9,12.7,22.7,20,33.8,30.4c12,11.4,20.4,26.1,32.7,37.4c3.6,3.3,9.1,1.5,10.4-3.1c7.3-25.4,22.8-48.2,38.5-69.2c15.5-20.8,31.3-41.4,46.7-62.3c7.4,9.5,14.5,19.2,21.4,29.1c10.5,15.2,20,31.1,28.3,47.6c8.2,16.1,15.7,32.6,24.5,48.4c2,3.7,4.2,7.4,6.4,11c2.4,4,8.7,3.9,10.9-0.3c11.7-22.1,27.7-43.3,33.2-68.1c-2.8-2.4-5.4-4.8-7.8-7.2C397.5,366.7,392.8,362,389.5,356.8z M370.5,430.2c-16.1-28.5-28.5-59-46.3-86.6c-8.6-13.3-17.9-26.1-27.6-38.7c-4.5-4-8.3-8.6-12.4-13c-2.4,3-5,5.9-7.6,8.7c-2.2,3.1-4.6,6.2-7.1,9.1c-14.2,19.1-28.7,37.8-42.8,57c-14.1,19-27.7,39.3-36,61.7c-8.1-8.8-15.2-18.6-23-27.6c-8.5-9.8-20.6-15.8-29.6-25c0.5-1.3,0.3-2.8-0.3-4.1c22.9-13.1,41.1-35.4,58.2-54.7c16.7-18.8,32.4-38.6,47-59.2c0.1,0.1,0.2,0.2,0.3,0.4c1.6-2.5,3.2-5,4.9-7.5c0.7-1.3,1.4-2.7,2.1-4c-2.8-3.2-5.2-6.8-7.6-10.4c-0.1,0.1-0.2,0.3-0.3,0.4c-17.9-23.1-35.1-46.8-53.2-69.8c-8.8-11.2-18-22-26.7-33.2c-7.8-10.1-15.5-20.5-25.3-28.8c-2.6-2.2-5.4-4.1-8.4-5.7c15.8-16.4,35.5-28.6,55.5-39.4c2.4,9.8,8.2,19.2,13.1,27.9c5.9,10.4,12.1,20.7,17.7,31.3c14.4,27.7,29.7,55,45.7,81.8c0.4,0.6,0.8,1.1,1.1,1.7c2.7,4,5.3,8,7.9,12.1c1.8-2,3.7-3.9,5.6-5.8c0.9-1.2,1.8-2.4,2.7-3.6l-0.4-0.7c12.5-20.9,24.2-42.2,35.1-63.8c7.7-15.2,14.2-30.8,20.5-46.6c3.6-9.2,7.4-18.3,11.7-27.2c15.2,26.8,33.2,51.9,51.9,76.4c-18.5,23.7-37.7,46.8-56.5,70.2c-10.6,13.3-20.7,26.8-30.6,40.5c0-0.1-0.1-0.1-0.1-0.2c-1.7,3.5-3.6,6.9-5.7,10.3c3.6,5.6,6.9,11.3,10.1,17.2c4.9,6.6,10,13.1,15.2,19.5c9.7,12,19.9,23.4,28.8,36.1c8.6,12.1,17.1,24.9,28.8,34.3c0.7,0.6,1.5,1,2.3,1.3c0.3,0.9,0.8,1.7,1.6,2.5c1.8,1.8,3.5,3.4,5.4,4.6C390.7,397.7,379.9,413.9,370.5,430.2z"></path>
                      </svg></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          {cuentaSeleccionada != null ? <h3 className="cuentaActual">Cuenta seleccionada actualmente: {cuentaSeleccionada.titular}</h3> : <h3>no tienes ninguna cuenta seleccionada, por favor, elige una de tus cuentas como cuenta de pago por defecto</h3>}
            
        </div>
      );
}
export default InfoBancaria;