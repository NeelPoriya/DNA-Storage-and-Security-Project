'use client';
import ApexChart from "@/components/ApexChart";
import Footer from "@/components/Footer";
import { Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineCloudDownload } from "react-icons/ai";
import { BsBuildingsFill, BsFillCalendarEventFill, BsFillGearFill, BsYoutube } from "react-icons/bs";
import { FaBookOpen, FaStamp } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import { ImBlogger } from "react-icons/im";
import { MdArticle } from "react-icons/md";

const Home = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const md = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const sm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const cardSpacing = sm ? 12 : md ? 6 : lg ? 4 : 3;
  const chartSpacing = sm ? 12 : md ? 12 : lg ? 12 : 6;

  const [books, setBooks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [patents, setPatents] = useState([]);
  const [papers, setPapers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tools, setTools] = useState([]);
  const [videos, setVideos] = useState([]);
  const [grants, setGrants] = useState([]);
  const [softwares, setSoftwares] = useState([]);

  async function fetchData() {

    try {
      const responses = await fetch('/api/all-data');

      const jsonData = await responses.json();

      setPapers(jsonData.articlePapers);
      setBlogs(jsonData.blogs);
      setCompanies(jsonData.companies);
      setCourses(jsonData.courses);
      setEvents(jsonData.events);
      setGrants(jsonData.grants);
      setPatents(jsonData.patents);
      setProjects(jsonData.projects);
      setTools(jsonData.simulationTools);
      setVideos(jsonData.youtubeContents);
      setSoftwares(jsonData.softwares);
      setBooks(jsonData.books);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const gridData = GetGridData(papers, blogs, companies, grants, patents, tools, courses, events, videos, projects, softwares, books);

  const grid = GetStatsCards(gridData, cardSpacing);

  const papersGraph = ResearchPaperOrgsChart(papers);

  const researchPaperYearGraph = GetResearchPaperYearGraph(papers);

  return (
    <>
      {papers.length === 0 &&
        <Box sx={{ background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc( 100vh - 5rem )' }}>
          <CircularProgress color="inherit" />
        </Box>
      }
      <Box>
        {papers.length !== 0 && grid}
        <Grid container spacing={2}>
          {papers.length !== 0 &&
            <>
              <Grid item xs={chartSpacing}>
                {papersGraph}
              </Grid>
              <Grid item xs={chartSpacing}>
                {researchPaperYearGraph}
              </Grid>
            </>
          }
        </Grid>
      </Box>
      {/* {papers.length !== 0 && <Footer />}  */}
      <Footer />
    </>
  )
}

export default Home


const Item = (title, value, color, icon) => {
  return (
    <Card elevation={0} sx={{ borderRadius: '1rem', backgroundColor: color + '22', width: '100%', height: '100%', display: 'flex', alignItems: 'center', border: '2px solid ' + color + '33' }} >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
          <Typography variant="body1" fontWeight={'600'} marginTop={.5} component='div'>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={'bold'} >
            {value}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '2rem', borderRadius: '50%', paddingRight: '1rem', display: 'flex', color: color }} variant="h6" component="div">
          {icon}
        </Typography>
      </CardContent>
    </Card>
  )
}

const extractSourceFrequencyArrayFromPapersArray = (papers) => {
  const sourceFrequency = {};

  papers.forEach((paper) => {
    if (sourceFrequency[paper['source']] === undefined) {
      sourceFrequency[paper['source']] = 1;
    } else {
      sourceFrequency[paper['source']] += 1;
    }
  });

  const sources = [];
  const frequencies = [];

  for (const [key, value] of Object.entries(sourceFrequency)) {
    sources.push(key);
    frequencies.push(value);
  }

  return [sources, frequencies];
}

function GetResearchPaperYearGraph(papers) {
  const chartOptions = {
    series: [{
      name: 'Number of Research Paper published',
      data: [...ExtractResearchPapersFrequency(papers)]
    }],
    options: {
      colors: [
        '#1289A7',
        '#40739e',
        '#00A4E9',
        '#01a3a4',
        '#686de0',
        '#e84118',
        '#F5912F',
        '#F24B40',
        '#B3C83C',
        '#F0B63C',
        '#74B245',
        '#FD6191',
        '#B237BC',
        '#F9A109',
        '#6ab04c',
        '#EDDB5C',
        '#ee5253',
        '#f368e0',
        '#8395a7',
        '#EE5A24',
        '#7FCD93',
      ],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'date',
        categories: [...ExtractYearsFromPapers(papers)],
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          fontFamily: 'Raleway',
          fontWeight: 'regular',
          colors: ["#000"]
        }
      },
    },
  };

  const researchPaperYearGraph = <Card elevation={0} sx={{ marginTop: '1rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(251, 251, 251, .7)' }}>
    <Typography variant="h6">Research Papers Published Years</Typography>
    <ApexChart options={chartOptions.options} series={chartOptions.series} type="bar" height={367} />
  </Card>;
  return researchPaperYearGraph;
}

function GetStatsCards(gridData, cardSpacing) {
  return <Box padding={2} marginTop={2} sx={{ background: 'rgba(251, 251, 251, .7)', borderRadius: '1rem' }}>
    <Typography variant="h6" marginBottom={1} marginLeft={1}>Statistics</Typography>
    <Grid container spacing={2}>

      {gridData.map(
        (item, index) => <Grid key={index} item xs={cardSpacing}>
          <Link style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }} href={item.href}>
            {Item(item.title, item.value, item.color, item.icon)}
          </Link>
        </Grid>
      )}
    </Grid>
  </Box>;
}

function GetGridData(papers, blogs, companies, grants, patents, tools, courses, events, videos, projects, softwares, books) {
  return [
    {
      href: '/research-papers',
      title: 'Total Research Papers',
      value: papers.length,
      color: '#7FCD93',
      icon: <MdArticle />
    },
    {
      href: '/blogs',
      title: 'Total Blogs',
      value: blogs.length,
      color: '#F9A109',
      icon: <ImBlogger />
    },
    {
      href: '/companies',
      title: 'Total Companies',
      value: companies.length,
      color: '#686de0',
      icon: <BsBuildingsFill />
    },
    {
      href: '/research-grants',
      title: 'Total Research Grants',
      value: grants.length,
      color: '#6ab04c',
      icon: <GiReceiveMoney />
    },
    {
      href: '/patents',
      title: 'Total Patents',
      value: patents.length,
      color: '#01a3a4',
      icon: <FaStamp />
    },
    {
      href: '/simulation-tools',
      title: 'Total Simulation Tools',
      value: tools.length,
      color: '#ee5253',
      icon: <BsFillGearFill />
    },
    {
      href: '/courses-and-tutorials',
      title: 'Total Courses',
      value: courses.length,
      color: '#f368e0',
      icon: <AiFillPlayCircle />
    },
    {
      href: '/conferences-and-webinar-events',
      title: 'Total Events',
      value: events.length,
      color: '#8395a7',
      icon: <BsFillCalendarEventFill />
    },
    {
      href: '/youtube-content',
      title: 'YouTube Content',
      value: videos.length,
      color: '#e84118',
      icon: <BsYoutube />
    },
    {
      href: '/projects',
      title: 'Total Projects',
      value: projects.length,
      color: '#40739e',
      icon: <GoGoal />
    },
    {
      href: '/software-and-tools',
      title: 'Total Software & Tools',
      value: softwares.length,
      color: '#EE5A24',
      icon: <AiOutlineCloudDownload />
    },
    {
      href: '/books',
      title: 'Total Books',
      value: books.length,
      color: '#1289A7',
      icon: <FaBookOpen />
    },
  ];
}

function ResearchPaperOrgsChart(papers) {
  const chartProps = {
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        formatter: function (val, opts) {
          return extractSourceFrequencyArrayFromPapersArray(papers)[0][opts.seriesIndex] + ' - ' + extractSourceFrequencyArrayFromPapersArray(papers)[1][opts.seriesIndex];
        }
      },
      colors: [
        // '#40739e',
        // '#686de0',
        // '#B237BC',
        // '#f368e0',
        // '#00A4E9',
        // '#1289A7',
        '#01a3a4',
        '#7FCD93',
        '#74B245',
        '#B3C83C',
        '#EDDB5C',
        '#F0B63C',
        '#F5912F',
        '#ee5253',
        '#F24B40',
        '#EE5A24',
        '#e84118',
      ],
      labels: [...extractSourceFrequencyArrayFromPapersArray(papers)[0]],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 400
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  const papersGraph = (
    <Card elevation={0} sx={{ marginTop: '1rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(251, 251, 251, .7)' }}>
      <Typography variant="h6">Research & Articles Sources</Typography>
      <ApexChart options={chartProps.options} series={extractSourceFrequencyArrayFromPapersArray(papers)[1]} type="donut" height={380} />
    </Card>
  );
  return papersGraph;
}

function ExtractYearsFromPapers(papers) {
  const years = [];
  papers.forEach((paper) => {
    const year = new Date(paper['publishedDate']).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  });
  // sort the years
  years.sort((a, b) => a - b);
  return years;
}

function ExtractResearchPapersFrequency(papers) {
  const years = ExtractYearsFromPapers(papers);
  const frequency = {};
  years.forEach((year) => {
    frequency[year] = 0;
  });
  papers.forEach((paper) => {
    const year = new Date(paper['publishedDate']).getFullYear();
    frequency[year] += 1;
  });

  const frequencies = [];
  for (const [key, value] of Object.entries(frequency)) {
    frequencies.push(value);
  }
  return frequencies;
}