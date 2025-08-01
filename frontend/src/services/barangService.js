import axios from "axios";

export const getAll = async () => {
  const {data} = await axios.get('/api/barang');
  return data;
};

export const search = async searchTerm =>
 {
  const {data} = await axios.get('/api/barang/search/' + searchTerm);
  return data;
 };


export const getAllTags = async () => 
{
  const {data} = await axios.get('/api/barang/tags');
  return data;
};

export const getAllByTag = async tag =>{
  if (tag === 'All') return getAll();
  const {data} = await axios.get('/api/barang/tag/' + tag);
  return data;
};

export const getByID = async barangId =>
{
  const {data} = await axios.get('/api/barang/' + barangId);
  return data;
};

export async function deleteById (barangId) {
  await axios.delete('/api/barang/' + barangId);
}

export async function update (barang) {
  await axios.put('/api/barang', barang);
}

export async function add(barang) {
  const {data} = await axios.post('/api/barang', barang);
  return data; 
}