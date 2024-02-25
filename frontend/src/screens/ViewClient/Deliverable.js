import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import "../../assets/css/Profile.css";
import axios from "axios";
import { getClientById } from "../../API/Client";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";


function Deliverable(props) {
  const { clientId } = useParams();
  const [preWedDeliverables, setPreWedDeliverables] = useState(null);
  const [otherDeliverables, setOtherDeliverables] = useState(null);

  const getIdData = async () => {
    try {
      const res = await getClientById(clientId)
      console.log(res);
      const preWedDeliverable = res.deliverables?.filter(deliverable => deliverable.deliverableName === 'Pre-Wedding Photos' || deliverable.deliverableName === 'Pre-Wedding Videos');
      setPreWedDeliverables(preWedDeliverable);
      const otherDeliverable = res.deliverables?.filter(deliverable => deliverable.deliverableName !== 'Pre-Wedding Photos' && deliverable.deliverableName !== 'Pre-Wedding Videos')
      setOtherDeliverables(otherDeliverable);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIdData();
  })


  return (
    <div>
      {preWedDeliverables?.length > 0 && (
        <div>
          <div style={{ display: "flex" }}>
            <div
              className="Text12Semi daysView"
              style={{
                background:
                  "#040A80"
                //  : i.id == 2 ? "#9D9A9A" : "#FF9797",
              }}
            >
              Pre-Wedding Deliverables
            </div>
          </div>
          <Table bordered hover responsive>
            <thead>
              <tr className="logsHeader Text16N1">
                <th>Deliverable</th>
                <th>Editor</th>
                <th>Wedding Date</th>
                <th>Client Deadline</th>
                <th>Current Status</th>
                <th>First Delivery Date</th>
                <th>Final Delivery Date</th>
                <th>Client Rating</th>
              </tr>
            </thead>
            <tbody
              className="Text12 primary2"
              style={{
                textAlign: "center",
                borderWidth: "0px 1px 0px 1px",
                // background: "#EFF0F5",
              }}
            >
              {preWedDeliverables.map((deliverable, i) => {
                return (
                  <tr>
                    <td className="textPrimary Text14Semi" style={{ paddingBottom: "30px" }}>{deliverable.deliverableName}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.editor?.firstName || 'Not Assigned'}</td>
                    <td className="textPrimary Text14Semi" >{dayjs(new Date(deliverable?.clientDeadline).setDate(new Date(deliverable?.clientDeadline).getDate() - 45)).format('DD-MM-YYYY')}</td>
                    <td className="textPrimary Text14Semi" >{dayjs(deliverable.clientDeadline).format('DD-MM-YYYY')}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.status || 'Pending'}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.firstDeliveryDate ? dayjs(deliverable.firstDeliveryDate).format('DD-MM-YYYY') : 'Not Assigned'}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.finalDeliverDate ? dayjs(deliverable.finalDeliveryDate).format('DD-MM-YYYY') : 'Not Assigned'}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.clientRating || 'Not Assigned'}</td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
      )}

      {otherDeliverables?.length > 0 && (
        <div>
          <div style={{ display: "flex" }}>
            <div
              className="Text12Semi daysView"
              style={{
                background:
                  // "#040A80"
                "#FF9797",
              }}
            >
              Other Deliverables
            </div>
          </div>
          <Table bordered hover responsive>
            <thead>
              <tr className="logsHeader Text16N1">
                <th>Deliverable</th>
                <th>Editor</th>
                <th>Wedding Date</th>
                <th>Client Deadline</th>
                <th>Current Status</th>
                <th>First Delivery Date</th>
                <th>Final Delivery Date</th>
                <th>Client Rating</th>
              </tr>
            </thead>
            <tbody
              className="Text12 primary2"
              style={{
                textAlign: "center",
                borderWidth: "0px 1px 0px 1px",
                // background: "#EFF0F5",
              }}
            >
              {otherDeliverables.map((deliverable, i) => {
                return (
                  <tr>
                    <td className="textPrimary Text14Semi" style={{ paddingBottom: "30px" }}>{deliverable.deliverableName}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.editor?.firstName || 'Not Assigned'}</td>
                    <td className="textPrimary Text14Semi" >{dayjs(new Date(deliverable?.clientDeadline).setDate(new Date(deliverable?.clientDeadline).getDate() - 45)).format('DD-MM-YYYY')}</td>
                    <td className="textPrimary Text14Semi" >{dayjs(deliverable.clientDeadline).format('DD-MM-YYYY')}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.status || 'Pending'}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.firstDeliveryDate ? dayjs(deliverable.firstDeliveryDate).format('DD-MM-YYYY') : 'Not Assigned'}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.finalDeliverDate ? dayjs(deliverable.finalDeliveryDate).format('DD-MM-YYYY') : 'Not Assigned'}</td>
                    <td className="textPrimary Text14Semi" >{deliverable.clientRating || 'Not Assigned'}</td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
      )}

    </div>
  );
}

export default Deliverable;
