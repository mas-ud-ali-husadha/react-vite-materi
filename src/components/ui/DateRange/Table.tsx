import moment from "moment";
import { Fragment } from "react";

const TableDate = ({ days }: { days: any[] }) => {
  const labels = [];
  for (let i = 0; i <= 6; i++) {
    labels.push(<span className="font-bold">{moment().day(i).format("dd")}</span>);
  }

  return (
    <table className="table-fixed">
      <thead>
        <tr>
          {labels.map((label, i) => (
            <td key={i} className="text-center">{label}</td>
          ))}
        </tr>
        <tr>
          <td
            style={{
              padding: "8px 5px !important",
              backgroundColor: "#fff",
            }}
            colSpan={7}
          ></td>
        </tr>
      </thead>
      <tbody>
        {days.map((tr: any, i: number) => (
          <Fragment key={i}>
            <tr>
              {tr.map((td: any, ind: number) => (
                <Fragment key={ind}>{td}</Fragment>
              ))}
            </tr>
            <tr className="last:none">
              <td
                style={{
                  padding: "8px 5px !important",
                  backgroundColor: "#fff",
                }}
                colSpan={7}
              ></td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TableDate;
