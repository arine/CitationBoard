const Promise = require('bluebird');
const phantom = require('phantom');
const rp = require('request-promise');

const getFromDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const M = url.match(/(?:https?:\/\/)?app\.dimensions\.ai\/discover\/publication(?:(?:\?|\&)[^&=]+=[^&=]+)*(?:\?|\&)and_facet_researcher=([^&=]+)(?:(?:\?|\&)[^&=]+=[^&=]+)*/i);
    if (!M) reject('Could not find researcher ID');

    rp({
      uri: 'https://app.dimensions.ai/details/publication/researcher/box/' + M[1] + '.json',
      json: true
    })
      .then(data => {
        if (data.sources && data.sources.length) {
          for (var i=0; i<data.sources.length; ++i) {
            if (data.sources[i].id === 'publication_plus' && data.sources[i].meta && data.sources[i].meta.length) {
              const meta = data.sources[i].meta;
              for (var j=0; j<meta.length; ++j) {
                if (meta[j].id === 'citations') {
                  resolve(meta[j].value);
                }
              }
            }
          }
          reject('No citation data');
        }
      }).catch(err => {
        reject(err);
      });
  });
};

const getFromGoogleScholar = (url) => {
  return new Promise((resolve, reject) => {
    const M = url.match(/(?:https?:\/\/)?scholar.google.com\/citations(?:(?:\?|\&)[^&=]+=[^&=]+)*(?:(?:\?|\&)user+=([^&=]+))(?:(?:\?|\&)[^&=]+=[^&=]+)*/i);
    if (!M) reject('Could not find user ID');

    rp(url)
      .then(htmlStr => {
        const cM = htmlStr.match(/<table[^>]*id="gsc_rsb_st">.*<td[^>]*><a[^>]*>Citations<\/a><\/td><td[^>]*>(\d+)<\/td>/i);
        if (cM) resolve(parseInt(cM[1]));
        else reject('No citation data');
      }).catch(err => { reject(err); });
  });
};

const getWithUrl = (url) => {
  return new Promise((resolve, reject) => {
    if (url.match(/(?:https?:\/\/)?app\.dimensions\.ai.*/i)) {
      getFromDimensions(url)
        .then(res => { resolve(res); })
        .catch(err => { reject(err); });
    }
    else if (url.match(/(?:https?:\/\/)?scholar.google.com.*/i)) {
      getFromGoogleScholar(url)
        .then(res => { resolve(res); })
        .catch(err => { reject(err); });
    }
    else {
      resolve(Math.random());
    }
  });
};
exports.getWithUrl = getWithUrl;

exports.getWithMember = (member) => {
  return new Promise((resolve, reject) => {
    if (member.url === 'dummy') {
      const coinToss = (parseInt(Math.random() * 10) % 2 === 0);
      if (coinToss) member.value = (member.value || 0) + 1;
      resolve(member);
    }
    else {
      getWithUrl(member.url)
      .then(value => {
        member.value = value;
        resolve(member);
      }).catch(err => { reject(err); });
    }
  });
};
