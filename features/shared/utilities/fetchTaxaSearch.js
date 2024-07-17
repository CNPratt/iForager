export async function fetchTaxaSearch(input) {
  let idRegex = /^[-,0-9]+$/;

  let encoded = encodeURI(input);

  // console.log(encoded);

  let url;

  if (idRegex.test(input)) {
    url = `https://api.inaturalist.org/v1/taxa/${encoded}`;
  } else {
    url = `https://api.inaturalist.org/v1/taxa?q=${encoded}`;
  }
  let response = await fetch(url);
  let parsed = await response.json();

  // parsed.results.forEach((result) => console.log(result.preferred_common_name));

  let extractedResults = [];

  parsed.results.forEach((result) =>
    extractedResults.push({
      name: result.name,
      commonName: result.preferred_common_name,
      taxonId: result.id,
      rank: result.rank,
    })
  );

  console.log(parsed.results[0]);

  return extractedResults;
}
