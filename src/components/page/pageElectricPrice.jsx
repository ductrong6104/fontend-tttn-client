import { getAllElectricityPrices } from "@/modules/electricity-prices/service";
import { useEffect, useState } from "react";
import TableComponent from "../table/tableComponent";

export default function PageElectricPrice() {
  const [electricityPrices, setElectricityPrices] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    getAllElectricityPrices().then((res) => {
      if (res.status === 200) {
        setElectricityPrices(res.data);
      }
    });
  }, [reload]);
  const handleClickEdit = () => {};
  const handleClickDelete = () => {};
  return (
    <div className="w-screen p-2 pl-8 pr-8">
      <div>Bảng giá điện</div>
      <TableComponent
        data={electricityPrices}
        columns={[
          { id: "electricTypeName", label: "Tên loại điện" },
          { id: "firstLevel", label: "Mức đầu" },
          { id: "secondLevel", label: "Mức cuối" },
          { id: "price", label: "Đơn giá" },
        ]}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
        presentName="electricityPrice"
      />
    </div>
  );
}
