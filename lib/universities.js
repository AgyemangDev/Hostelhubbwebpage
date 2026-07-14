import gcLogo from "../public/assets/universitylogos/Gc.png";
import knustLogo from "../public/assets/universitylogos/knust.png";
import uccLogo from "../public/assets/universitylogos/ucc.png";
import udsLogo from "../public/assets/universitylogos/uds.png";
import uenrLogo from "../public/assets/universitylogos/uenr.png";
import uewLogo from "../public/assets/universitylogos/uew.png";
import ugLogo from "../public/assets/universitylogos/ug.png";
import uhasLogo from "../public/assets/universitylogos/uhas.png";
import umatLogo from "../public/assets/universitylogos/umat.png";

export const UNIVERSITIES = [
  {
    name: "KNUST",
    fullName: "Kwame Nkrumah University of Science and Technology",
    slug: "knust",
    city: "Kumasi",
    logo: knustLogo,
  },
  {
    name: "Legon",
    fullName: "University of Ghana",
    slug: "university-of-ghana-legon",
    city: "Accra",
    logo: ugLogo,
  },
  {
    name: "UCC",
    fullName: "University of Cape Coast",
    slug: "ucc",
    city: "Cape Coast",
    logo: uccLogo,
  },
  {
    name: "UMaT",
    fullName: "University of Mines and Technology",
    slug: "umat",
    city: "Tarkwa",
    logo: umatLogo,
  },
  {
    name: "UDS",
    fullName: "University for Development Studies",
    slug: "uds",
    city: "Tamale",
    logo: udsLogo,
  },
  {
    name: "UEW",
    fullName: "University of Education, Winneba",
    slug: "uew",
    city: "Winneba",
    logo: uewLogo,
  },
  {
    name: "UENR",
    fullName: "University of Energy and Natural Resources",
    slug: "uenr",
    city: "Sunyani",
    logo: uenrLogo,
  },
  {
    name: "UHAS",
    fullName: "University of Health and Allied Sciences",
    slug: "uhas",
    city: "Ho",
    logo: uhasLogo,
  },
  {
    name: "GIMPA", // ⚠️ confirm this — see note below
    fullName: "Ghana Institute of Management and Public Administration",
    slug: "gimpa",
    city: "Accra",
    logo: gcLogo,
  },
];

export const CITIES = [
  { name: "Kumasi", slug: "kumasi" },
  { name: "Accra", slug: "accra" },
  { name: "Cape Coast", slug: "cape-coast" },
  { name: "Tamale", slug: "tamale" },
  { name: "Sunyani", slug: "sunyani" },
  { name: "Ho", slug: "ho" },
  { name: "Koforidua", slug: "koforidua" },
];