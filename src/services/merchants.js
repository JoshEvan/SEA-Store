import callAPI from './api';

export const registerMerchant = async merchantInfo => {
  const res = await callAPI(`/merchants`, 'POST', JSON.stringify(merchantInfo));
  if (res.status != 201) {
    return null;
  }
  return await res.json();
};

export const getMerchantById = async merchantId => {
  const res = await callAPI(`/merchants/${merchantId}`, 'GET');
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export const updateMerchants = async (balance, description, verified) => {
  const res = await callAPI(
    `merchants/${merchantId}?balance=${balance}&description=${description}&verified=${verified}`
  );
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export const sendProposal = async proposal => {
  const res = await callAPI(
    `/proposals/upload`,
    'POST',
    JSON.stringify(proposal)
  );
  if (res.status != 201) {
    return null;
  }
  return res.text();
};
