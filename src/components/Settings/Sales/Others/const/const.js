export const othersTabMenuData= [
    {
      label: "Competitors",
      tab: "Otherstable",
      select: false,
      tabName: "Competitors",
      heading: "Competitors",
      data: "competitorsTableData",

    },

    {
      label: "Reference",
      tab: "Otherstable",
      select: true,
      tabName: "Reference",
      heading: "Reference",
      data:"referenceTableData" ,
    },
    {
      label: "Trade",
      tab: "Otherstable",
      select: true,
      tabName: "Trade",
      heading: "Trade",
      data: "tradeTableData",
    },
    {
      label: "Festivals",
      tab: "Otherstable",
      select: true,
      tabName: "Festivals",
      heading: "Festivals",
      data: "festivalsTableData",
    },
    {
      label: "Others",
      tab: "OthersForm",
      select: true,
      tabName: "Others",
      heading: "Others",
    },
  ];

  export const othersTablesOverlayData= [
    { label: "Edit", icon: "fas fa-pen" },
    { label: "Disable", icon: "far fa-circle" },
    { label: "Delete", icon: "fas fa-trash-alt" },
  ];
  export const competitorsTableColumnsData= [
    { field: "actions", header: "Actions" },
    { field: "s_no", header: "S.No." },
    { field: "competitor_name", header: "Competitor Name" },
    { field: "address", header: "Address" },
    { field: "created_by", header: "Created By" },
    { field: "email", header: "E-mail" },
    { field: "phone_no", header: "Phone No" },
    { field: "website", header: "Website" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
   
  ];
 export const referenceTableColumnsData=[
    { field: "actions", header: "Actions" },
    { field: "s_no", header: "S.No." },
    { field: "domain", header: "Domain" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
  ];
  export const tradeTableColumnsData= [
    { field: "actions", header: "Actions" },
    { field: "s_no", header: "S.No." },
    { field: "trade_name", header: "Trade Name" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
  ];
  export const festivalsTableColumnsData= [
    { field: "actions", header: "Actions" },
    { field: "s_no", header: "S.No." },
    { field: "festival_name", header: "Festival Name" },
    { field: "created_by", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Status" },
  ];