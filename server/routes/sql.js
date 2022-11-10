const getCG4 = "SELECT itemcd _id, itemnm name FROM sys_cd_item WHERE grpcd = 'PD103' AND itemcd like '0123020%' \n";

const getAcolProduct = 
  "SELECT \n"+
  "	productid, \n"+
  "	productnm, \n"+
  "	category4cd, \n"+
  "	imgsrc, \n"+
  "	regprice, \n"+
  "	statuscd \n"+
  "FROM biz_product_info \n"+
  "WHERE category4cd LIKE '0123020%' \n"+
  "AND statuscd = 'Y' \n"+
  "";

const getAcolDetails = 
  "SELECT \n"+
  "	a.productid, \n"+
  "	a.productnm, \n"+
  "	a.imgsrc, \n"+
  "	a.regprice, \n"+
  "	a.weight \n"+
  "FROM biz_product_info a \n"+
  "WHERE category4cd LIKE '0123020%' \n"+
  " AND productid = ? \n" ;
  
module.exports = {getCG4,getAcolProduct,getAcolDetails};