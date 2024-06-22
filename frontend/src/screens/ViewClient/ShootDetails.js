import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import "../../assets/css/Profile.css";
import Heart from "../../assets/Profile/Heart.svg";
import dayjs from "dayjs";
import {  getClientById } from "../../API/Client"
import BASE_URL from "../../API";

function ShootDetails(props) {

  const [clientData, setClientData] = useState(null)
  const [teamView, setTeamView] = useState(false);
  const [teamToShow, setTeamToShow] = useState(null)
  const { clientId } = useParams()

  useEffect(() => {
    getIdData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getIdData = async () => {
    try {
      const res = await getClientById(clientId)
      setClientData(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        {teamView ? (
          <div className="shootDetailsBox">
            <div
              className="Text24Semi"
              style={{ textAlign: 'center', marginBottom: '15px' }}
            >
              About Team
            </div>
            <div className="shootCardBox">
              <div className="w-25">
                {clientData?.userID?.photo ? (

                  <img alt="" className="imgRadius w-100 h-100"
                    src={BASE_URL + '/' + clientData?.userID?.photo}
                  />
                ) : (
                  <div className="ProfileBox Text38Semi p-2">
                    {`${clientData?.userID?.firstName.charAt(0).toUpperCase()}${clientData?.userID?.lastName.charAt(0).toUpperCase()}`}
                  </div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <text className="Text14Semi">
                  Team Leader: <text style={{ color: '#666DFF' }}>{clientData.userID?.firstName + " " + clientData.userID?.lastName}</text>
                </text>
                <br />
                <blockquote>
                  <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                    {clientData.userID?.About}
                  </h3>
                </blockquote>
              </div>
            </div>

            {teamToShow?.shootDirector?.length > 0 && teamToShow?.shootDirector?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>

                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Shoot Director: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>
              </div>
            )}
            {teamToShow?.choosenPhotographers?.length > 0 && teamToShow?.choosenPhotographers?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}

                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>
                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Photographer: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>
              </div>
            )}


            {teamToShow?.choosenCinematographers.length > 0 && teamToShow.choosenCinematographers?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>
 
                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Cinematographer: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>

              </div>
            )}
            {teamToShow?.droneFlyers?.length > 0 && teamToShow.droneFlyers?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>

                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Drone Flyer: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>

              </div>
            )}
            {teamToShow?.manager.length > 0 && teamToShow?.manager?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                      
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>
                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Manager: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>

              </div> 
            )}
            {teamToShow?.assistants.length > 0 && teamToShow?.assistants?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                     
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>
                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Assistant Name: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>

              </div>
            )}
            {teamToShow?.sameDayPhotoMakers.length > 0 && teamToShow?.sameDayPhotoMakers?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>
                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Same Day Photo Maker: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>

              </div>
            )}
            {teamToShow?.sameDayVideoMakers.length > 0 && teamToShow?.sameDayVideoMakers?.map((user, ind) =>
              <div className="shootCardBox mt-5">
              <div className="w-25">
                  {user?.photo ?
                    <img alt="" className="imgRadius w-100 h-100"
                      src={BASE_URL + '/' + user.photo}
                    />
                    : <div className="ProfileBox Text38Semi p-2">
                      {`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`}
                    </div>
                  }
                </div>
                <div style={{ padding: '20px' }}>
                  <text className="Text14Semi">
                    Same Day Video Maker: <text style={{ color: '#666DFF' }}>{user.firstName + " " + user.lastName}</text>
                  </text>
                  <br />
                  <blockquote>
                    <h3 className="Text12 gray" style={{ paddingTop: '15px' }}>
                      {user.About}
                    </h3>
                  </blockquote>
                </div>

              </div>
            )}
          </div>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr className="logsHeader Text16N1">
                <th>Client</th>
                <th>Event</th>
                <th>Date</th>
                <th>Location</th>
                <th style={{ whiteSpace: 'nowrap' }}>Team Leader</th>
                <th style={{ whiteSpace: 'nowrap' }}>
                  Photographers
                </th>
                <th style={{ whiteSpace: 'nowrap' }}>
                  Cinematographers
                </th>
                <th style={{ whiteSpace: 'nowrap' }}>
                  Drone Flyers
                </th>
                <th>Team Details</th>
              </tr>
            </thead>
            <tbody
              className="Text12 primary2"
              style={{
                textAlign: 'center',
                borderWidth: '1px 1px 1px 1px',
                // background: "#EFF0F5",
              }}
            >
              {clientData?.events?.map((event, index) =>
                <tr>
                  <td className="Text14Semi textPrimary">
                    {clientData.brideName}
                    <br />
                    <img alt="" src={Heart} />
                    <br />
                    {clientData.groomName}
                  </td>
                  <td className="tablePlaceContent  textPrimary fs-6">{event.eventType}</td>
                  <td className="tablePlaceContent  textPrimary fs-6">{dayjs(event.eventDate).format('DD-MMM-YYYY')}</td>
                  <td className="tablePlaceContent  textPrimary fs-6">{event.location}</td>
                  <td className="tablePlaceContent  textPrimary fs-6">{clientData.userID && clientData.userID?.firstName + " " + clientData.userID?.lastName}</td>
                  <td className="tablePlaceContent  textPrimary fs-6">
                    {event.choosenPhotographers?.length > 0 &&
                      <div>
                        {event.choosenPhotographers?.map((photographer, i) => {
                          return (
                            <>{i + 1}. {photographer.firstName + " " + photographer.lastName}
                              <br />
                            </>
                          )
                        })}

                      </div>
                    }
                  </td>
                  <td className="tablePlaceContent  textPrimary fs-6">
                    {event.choosenCinematographers?.length > 0 &&
                      <div>
                        {event.choosenCinematographers?.map((cinematographer, i) => {
                          return (
                            <>{i + 1}. {cinematographer.firstName + " " + cinematographer.lastName}
                              <br />
                            </>
                          )
                        })}
                      </div>
                    }
                  </td>
                  <td className="tablePlaceContent  textPrimary fs-6">
                    {event.droneFlyers?.length > 0 &&
                      <div>
                        {event.droneFlyers.map((droneFlyer, i) => {
                          return (
                            <>{i + 1}. {droneFlyer.firstName + " " + droneFlyer.lastName}
                              <br />
                            </>
                          )
                        })}
                      </div>
                    }
                  </td>
                  <td>
                    <Button
                      className="submit_btn submit w-100 p-1 shootDetailsBtn"
                      style={{ marginRight: '10px' }}
                      onClick={() => {
                        setTeamView(true);
                        setTeamToShow(event)
                      }}
                    >
                      Team
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default ShootDetails;
