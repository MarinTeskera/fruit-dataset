--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: country; Type: TABLE; Schema: public; Owner: mairnteskera
--

CREATE TABLE public.country (
    id integer NOT NULL,
    name character varying(50),
    code character varying(10)
);


ALTER TABLE public.country OWNER TO mairnteskera;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: mairnteskera
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_id_seq OWNER TO mairnteskera;

--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mairnteskera
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- Name: fruit; Type: TABLE; Schema: public; Owner: mairnteskera
--

CREATE TABLE public.fruit (
    id integer NOT NULL,
    name character varying(50),
    color character varying(50),
    type character varying(50),
    description text,
    countryid integer NOT NULL
);


ALTER TABLE public.fruit OWNER TO mairnteskera;

--
-- Name: fruit_countryid_seq; Type: SEQUENCE; Schema: public; Owner: mairnteskera
--

CREATE SEQUENCE public.fruit_countryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fruit_countryid_seq OWNER TO mairnteskera;

--
-- Name: fruit_countryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mairnteskera
--

ALTER SEQUENCE public.fruit_countryid_seq OWNED BY public.fruit.countryid;


--
-- Name: fruit_id_seq; Type: SEQUENCE; Schema: public; Owner: mairnteskera
--

CREATE SEQUENCE public.fruit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fruit_id_seq OWNER TO mairnteskera;

--
-- Name: fruit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mairnteskera
--

ALTER SEQUENCE public.fruit_id_seq OWNED BY public.fruit.id;


--
-- Name: nutritionalvalue; Type: TABLE; Schema: public; Owner: mairnteskera
--

CREATE TABLE public.nutritionalvalue (
    fruitid integer NOT NULL,
    name character varying(50),
    percentage numeric(5,2)
);


ALTER TABLE public.nutritionalvalue OWNER TO mairnteskera;

--
-- Name: nutritionalvalue_fruitid_seq; Type: SEQUENCE; Schema: public; Owner: mairnteskera
--

CREATE SEQUENCE public.nutritionalvalue_fruitid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nutritionalvalue_fruitid_seq OWNER TO mairnteskera;

--
-- Name: nutritionalvalue_fruitid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mairnteskera
--

ALTER SEQUENCE public.nutritionalvalue_fruitid_seq OWNED BY public.nutritionalvalue.fruitid;


--
-- Name: price; Type: TABLE; Schema: public; Owner: mairnteskera
--

CREATE TABLE public.price (
    fruitid integer NOT NULL,
    amount numeric(12,2),
    currency character varying(25)
);


ALTER TABLE public.price OWNER TO mairnteskera;

--
-- Name: price_fruitid_seq; Type: SEQUENCE; Schema: public; Owner: mairnteskera
--

CREATE SEQUENCE public.price_fruitid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_fruitid_seq OWNER TO mairnteskera;

--
-- Name: price_fruitid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mairnteskera
--

ALTER SEQUENCE public.price_fruitid_seq OWNED BY public.price.fruitid;


--
-- Name: country id; Type: DEFAULT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- Name: fruit id; Type: DEFAULT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.fruit ALTER COLUMN id SET DEFAULT nextval('public.fruit_id_seq'::regclass);


--
-- Name: fruit countryid; Type: DEFAULT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.fruit ALTER COLUMN countryid SET DEFAULT nextval('public.fruit_countryid_seq'::regclass);


--
-- Name: nutritionalvalue fruitid; Type: DEFAULT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.nutritionalvalue ALTER COLUMN fruitid SET DEFAULT nextval('public.nutritionalvalue_fruitid_seq'::regclass);


--
-- Name: price fruitid; Type: DEFAULT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.price ALTER COLUMN fruitid SET DEFAULT nextval('public.price_fruitid_seq'::regclass);


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: mairnteskera
--

COPY public.country (id, name, code) FROM stdin;
1	United States	US
2	Canada	CA
3	Brazil	BR
4	France	FR
5	India	IN
6	Spain	ES
7	Australia	AU
8	Mexico	MX
9	Italy	IT
10	China	CN
\.


--
-- Data for Name: fruit; Type: TABLE DATA; Schema: public; Owner: mairnteskera
--

COPY public.fruit (id, name, color, type, description, countryid) FROM stdin;
1	Apple	Red	Pome Fruit	Crisp and sweet	1
2	Banana	Yellow	Tropical Fruit	Creamy and sweet	2
3	Orange	Orange	Citrus Fruit	Juicy and citrusy	1
4	Strawberry	Red	Berry	Sweet and juicy	3
5	Grapes	Purple	Berry	Sweet and seedless	4
6	Mango	Yellow	Tropical Fruit	Tropical and juicy	3
7	Kiwi	Green	Exotic Fruit	Tangy and exotic	5
8	Pineapple	Yellow	Tropical Fruit	Sweet and tropical	6
9	Watermelon	Green	Melon	Refreshing and hydrating	7
10	Cherry	Red	Berry	Sweet and tart	8
\.


--
-- Data for Name: nutritionalvalue; Type: TABLE DATA; Schema: public; Owner: mairnteskera
--

COPY public.nutritionalvalue (fruitid, name, percentage) FROM stdin;
1	Vitamin C	95.50
1	Dietary Fiber	3.70
2	Potassium	9.50
2	Vitamin B6	0.50
3	Vitamin C	83.70
3	Dietary Fiber	2.40
4	Fiber	2.20
4	Vitamin C	1.20
5	Antioxidants	4.60
5	Resveratrol	0.50
6	Vitamin A	67.60
6	Vitamin C	60.20
7	Vitamin C	154.60
7	Manganese	0.30
8	Hydration	90.20
8	Vitamin K	3.70
9	Vitamin C	8.10
9	Potassium	1.20
10	Antioxidants	1.20
10	Vitamin C	7.60
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: mairnteskera
--

COPY public.price (fruitid, amount, currency) FROM stdin;
1	0.99	USD
2	0.49	USD
3	0.79	USD
4	1.29	USD
5	1.99	USD
6	1.49	USD
7	0.89	USD
8	1.99	USD
9	0.69	USD
10	1.29	USD
\.


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mairnteskera
--

SELECT pg_catalog.setval('public.country_id_seq', 10, true);


--
-- Name: fruit_countryid_seq; Type: SEQUENCE SET; Schema: public; Owner: mairnteskera
--

SELECT pg_catalog.setval('public.fruit_countryid_seq', 1, false);


--
-- Name: fruit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mairnteskera
--

SELECT pg_catalog.setval('public.fruit_id_seq', 10, true);


--
-- Name: nutritionalvalue_fruitid_seq; Type: SEQUENCE SET; Schema: public; Owner: mairnteskera
--

SELECT pg_catalog.setval('public.nutritionalvalue_fruitid_seq', 1, false);


--
-- Name: price_fruitid_seq; Type: SEQUENCE SET; Schema: public; Owner: mairnteskera
--

SELECT pg_catalog.setval('public.price_fruitid_seq', 1, false);


--
-- Name: country country_code_key; Type: CONSTRAINT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_code_key UNIQUE (code);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: fruit fruit_pkey; Type: CONSTRAINT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.fruit
    ADD CONSTRAINT fruit_pkey PRIMARY KEY (id);


--
-- Name: fruit fruit_countryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.fruit
    ADD CONSTRAINT fruit_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.country(id);


--
-- Name: nutritionalvalue nutritionalvalue_fruitid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.nutritionalvalue
    ADD CONSTRAINT nutritionalvalue_fruitid_fkey FOREIGN KEY (fruitid) REFERENCES public.fruit(id);


--
-- Name: price price_fruitid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mairnteskera
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_fruitid_fkey FOREIGN KEY (fruitid) REFERENCES public.fruit(id);


--
-- PostgreSQL database dump complete
--

