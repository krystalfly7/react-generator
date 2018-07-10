import superagent from 'superagent';

const fetchData = (url, obj = {}) => {
  return new Promise((resolve, reject) => {
      superagent('get', url)
      .query(obj)
      .end((err, res) => {
        if (err) return reject(err);
        if (res.body === null) return reject(new Error('Response Error'));
        if (res.body.error) return reject(new Error(res.body.error.message));
        if (res.body.code === 200 && res.body.data) {
          resolve(res.body.data);
        } else {
          reject(new Error(res.body.message || res.body.msg || 'Response Error'));
        }
      });
  });
};

const postData = (data, url) => {
  return new Promise((resolve, reject) => {
    superagent('post', url)
      .send(data)
      .end((err, res) => {
        if (err) return reject(err);
        if (res.body === null) return reject(new Error('Response Error'));
        if (res.body.error) return reject(new Error(res.body.error.message));
        if (res.body.code === 200) {
          resolve(res.body);
        } else {
          reject(new Error(res.body.message || res.body.msg || 'Response Error'));
        }
      });
  });
};


export {
	fetchData,
  postData
};
