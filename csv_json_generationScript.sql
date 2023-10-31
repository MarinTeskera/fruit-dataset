COPY (
  SELECT f.name, f.color, f.type, f.description, 
		c.name as countryName, c.code as countryCode,
        nv.name as nutritionalValueName, nv.percentage as nutritionalValuePercentage,
        p.amount as price, p.currency
  FROM fruit AS f
  JOIN country AS c ON f.countryId = c.id
  LEFT JOIN nutritionalValue AS nv ON f.id = nv.fruitId
  LEFT JOIN price AS p ON f.id = p.fruitId
) TO 'fruit_data.csv' DELIMITER ',' CSV HEADER;

COPY (
  SELECT json_agg(json_build_object(
    'name', f.name,
    'color', f.color,
	'type', f.type,
    'description', f.description,
    'country', json_build_object('countryName', c.name, 'countryCode', c.code),
    'nutritionalValues', (
      SELECT json_agg(json_build_object('nutritionalValueName', nv.name, 'percentage', nv.percentage))
      FROM nutritionalValue AS nv
      WHERE nv.fruitId = f.id
    ),
    'prices', (
      SELECT json_agg(json_build_object('amount', p.amount, 'currency', p.currency))
      FROM price AS p
      WHERE p.fruitId = f.id
    )
  ))
  FROM fruit AS f
  JOIN country AS c ON f.countryId = c.id
) TO 'fruit_data.json';


