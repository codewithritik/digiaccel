import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessToaster } from "../Toster/toster";

export function MyVerticallyCenteredModal(props) {
  const {uniqueId} = useParams()
  const naviagate = useNavigate();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Your New Quiz is Created
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <h4>Your New Quiz is Created</h4>
        <p>Please Copy Your New Quiz URL</p>
        <div className="linkDiv" style={{
          display:"flex"
        }}>
          <p style={{marginRight:"20px"}}>
           
            http://localhost:3000/user/quiz/{uniqueId}
          {" "} {" "}{" "}
          </p>
          <CopyToClipboard
            text={`http://localhost:3000/user/quiz/${uniqueId}`}
            onCopy={() => {
              SuccessToaster("Copied to clipboard");
            }}
          >
            <span>
              <FaClipboard fontSize={"20px"} />
            </span>
          </CopyToClipboard>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          props.onHide();
          naviagate("/allquizlink");
        }}>Next</Button>
      </Modal.Footer>
    </Modal>
  );
}
