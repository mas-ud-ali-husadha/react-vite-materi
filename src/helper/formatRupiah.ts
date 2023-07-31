const formatRupiah = (angka: any, prefix = ".") => {
  const number_string = String(angka)
    .replace(/[^,\d]/g, "")
    .toString();
  const split = number_string.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? prefix : "";
    rupiah += separator + ribuan.join(prefix);
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;

  return parseInt(String(angka)) < 0 ? `-${rupiah}` : rupiah;
};

export default formatRupiah;
