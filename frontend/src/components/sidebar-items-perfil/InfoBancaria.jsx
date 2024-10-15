import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/infoBancaria.css";
function InfoBancaria() {
  const token = localStorage.getItem("token");
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
      console.log("entra:", cuentasBancarias);
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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
                  <button onClick={() => eliminarCuentaBancaria(cuenta.numero_cuenta)}>x</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          {cuentaSeleccionada != null ? <h3 className="cuentaActual">Cuenta seleccionada actualmente: {cuentaSeleccionada.titular}</h3> : <div className="textoBanco"> <h3>No tienes ninguna cuenta seleccionada, por favor, elige una de tus cuentas como cuenta de pago por defecto</h3></div>}
            
        </div>
      );
}
export default InfoBancaria;