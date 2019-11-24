import React, { useEffect, useState } from "react";
import MainTemplate from "../../../templates/MainTemplate";
import "./Reservation.scss";
import reservationService from "./reservationService";
import { ApiResponse } from "../../../common/types";
import { ParkingList } from "./reservationTypes";
import LoadingIndicator from "../../../utils/LoadingIndicator";
import { useHistory } from "react-router";
import { routes } from "../../../routes";

interface ReservationProps {}

const Reservation: React.FC<ReservationProps> = props => {
  const [promise, setPromise] = useState<Promise<any> | undefined>(undefined);
  const [parkingList, setParkingList] = useState<ApiResponse<ParkingList[]>>();
  const history = useHistory();
  useEffect(() => {
    const fetchParkingList = async () => {
      const promise = reservationService.getAllParking();
      setPromise(promise);
      const res = await promise;
      setParkingList(res);
    };
    fetchParkingList();
  }, []);

  const handleSelectParking = (parking: ParkingList) => {
    history.push(`${routes.reservation}${parking.id}`);
  };
  console.log(parkingList);

  return (
    <MainTemplate>
      <LoadingIndicator promise={promise}>
        <div className="wrap-parking-list">
          <span className="title-parking-list">Reservation:</span>
          <ul className="list-group">
            {parkingList &&
              parkingList.result.map(parking => {
                const amountParkingSpots = parking.parkingSpots.length;

                return (
                  <li
                    key={parking.id}
                    className="list-group-item parking-list-li d-flex"
                    onClick={() => handleSelectParking(parking)}
                  >
                    <div className="parking-list-data">
                      <span>{`${parking.name}`}</span>
                      <span className="parking-list-data-detail">{`${parking.address}`}</span>
                    </div>
                    <span className="badge badge-primary badge-pill parking-list-amount-parking-spot">
                      {`${parking.availableSpots} available spot${parking.availableSpots === "1" ? "" : "s"}`}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </LoadingIndicator>
    </MainTemplate>
  );
};
export default Reservation;
