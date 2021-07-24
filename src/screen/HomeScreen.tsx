import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { ROLE_SUPERVISOR } from "../helpers/Constants";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Logo from "../assets/logo/logo.png";
import {
  quantityUserRegister,
  quantityOfferBusiness,
} from "../services/statisticsService";
import Swal from "sweetalert2";

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

interface DataSets {
  label: string;
  data: number[];
  backgroundColor: any;
  borderWidth: number;
}

export const HomeScreen = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const [userRegister, setUserRegister] = useState(0);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Cantidad de ofertas de trabajo por empresa",
        data: [],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
        borderWidth: 4,
      },
    ],
  });

  useEffect(() => {
    callQuantityUserRegister();
  }, []);

  useEffect(() => {
    callQuantityBusinessOffer();
  }, []);

  const callQuantityUserRegister = async () => {
    const resp = await quantityUserRegister();
    if (resp) {
      if (resp !== 401) {
        setUserRegister(resp);
      } else {
        dispatch({ type: "clear" });
        Swal.fire("La sesión ha terminado");
      }
    }
  };

  const callQuantityBusinessOffer = async () => {
    const resp = await quantityOfferBusiness();
    if (resp) {
      if (typeof resp !== "number") {
        console.log(resp);
        setChartData({
          ...chartData,
          labels: resp.quantityByBusiness.map((item) => item.name),
          datasets: chartData.datasets.map((item) => ({
            ...item,
            data: resp.quantityByBusiness.map((item) => item.quantity),
          })),
        });
      } else {
        dispatch({ type: "clear" });
        Swal.fire("La sesión ha terminado");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "95%",
          minWidth: "240px",
          maxWidth: "900px",
        }}
      >
        {data?.role.includes(ROLE_SUPERVISOR) ? (
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div
                className="card text-dark bg-info mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div
                  className="card-header"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  Usuarios registrados
                </div>
                <div className="card-body">
                  <p
                    className="card-text"
                    style={{ fontSize: 30, textAlign: "center" }}
                  >
                    {userRegister}
                  </p>
                </div>
              </div>
            </div>
            <Bar
              className="chart"
              data={chartData}
              options={{
                indexAxis: 'y',
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  display: false,
                },
              }}
            />
          </div>
        ) : (
          <div style={{display: 'flex', width: "100%", justifyContent: 'center'}}>
            <img
              src={Logo}
              alt="logo portal de empleo"
            />
          </div>
        )}
      </div>
    </div>
  );
};
