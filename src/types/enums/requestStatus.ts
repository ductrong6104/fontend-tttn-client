export enum RequestStatus {
  BoSung = 0, // bổ sung
  KetThuc = 1, // kết thúc
  HuyYeuCau = 2, // hủy yêu cầu
}

// Map ánh xạ Enum sang chuỗi
export const RequestStatusMap: Record<RequestStatus, string> = {
    [RequestStatus.BoSung]: 'Bổ sung thông tin',
    [RequestStatus.KetThuc]: 'Kết thúc hợp đồng',
    [RequestStatus.HuyYeuCau]: 'Hủy yêu cầu',
    
  };