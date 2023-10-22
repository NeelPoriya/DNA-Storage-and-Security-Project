'use client';
import ApexChart from "@/components/ApexChart";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Typography, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineCloudDownload } from "react-icons/ai";
import { BsBuildingsFill, BsFillCalendarEventFill, BsFillGearFill, BsYoutube } from "react-icons/bs";
import { FaStamp } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import { ImBlogger } from "react-icons/im";
import { MdArticle } from "react-icons/md";

const Item = (title, value, color, icon) => {
  return (
    <Card elevation={2} sx={{ borderRadius: '1rem', paddingLeft: '.5rem', paddingTop: '.5rem' }} >
      <CardContent>
        <Typography sx={{ fontSize: '1.5rem', padding: '.5rem', borderRadius: '50%', backgroundColor: color, width: 'fit-content', display: 'flex', color: 'white' }} variant="h6" component="div">
          {icon}
        </Typography>
        <Typography variant="body1" fontWeight={'600'} marginTop={.5} component='div'>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={'bold'}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

const extractSourceFrequencyArrayFromPapersArray = (papers) => {
  const sourceFrequency = {};

  papers.forEach((paper) => {
    if (sourceFrequency[paper['Source']] === undefined) {
      sourceFrequency[paper['Source']] = 1;
    } else {
      sourceFrequency[paper['Source']] += 1;
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

const Home = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const md = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const sm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const cardSpacing = sm ? 12 : md ? 6 : lg ? 4 : 3;
  const chartSpacing = sm ? 12 : md ? 12 : lg ? 12 : 6;

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
    const promises = [
      fetch('/api/articles-papers'),
      fetch('/api/blogs'),
      fetch('/api/companies'),
      fetch('/api/courses'),
      fetch('/api/events'),
      fetch('/api/grants'),
      fetch('/api/patents'),
      fetch('/api/projects'),
      fetch('/api/simulation-tools'),
      fetch('/api/youtube'),
      fetch('/api/softwares')
    ];

    try {
      const responses = await Promise.all(promises);

      const jsonData = await Promise.all(responses.map((response) => {
        return response.json();
      }));

      setPapers(jsonData[0].data);
      setBlogs(jsonData[1].data);
      setCompanies(jsonData[2].data);
      setCourses(jsonData[3].data);
      setEvents(jsonData[4].data);
      setGrants(jsonData[5].data);
      setPatents(jsonData[6].data);
      setProjects(jsonData[7].data);
      setTools(jsonData[8].data);
      setVideos(jsonData[9].data);
      setSoftwares(jsonData[10].data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const grid = (
    <Box padding={2}>
      <Typography variant="h6" marginBottom={1} marginLeft={1}>Statistics</Typography>
      <Grid container spacing={2} >
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/research-papers'>
            {Item('Total Research Papers', papers.length, '#7FCD93', <MdArticle />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/blogs'>
            {Item('Total Blogs', blogs.length, '#F9A109', <ImBlogger />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/companies'>
            {Item('Total Companies', companies.length, '#686de0', <BsBuildingsFill />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/research-grants'>
            {Item('Total Research Grants', grants.length, '#6ab04c', <GiReceiveMoney />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/patents'>
            {Item('Total Patents', patents.length, '#01a3a4', <FaStamp />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/simulation-tools'>
            {Item('Total Simulation Tools', tools.length, '#ee5253', <BsFillGearFill />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/courses-and-tutorials'>
            {Item('Total Courses', courses.length, '#f368e0', <AiFillPlayCircle />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/conferences-and-webinar-events'>
            {Item('Total Events', events.length, '#8395a7', <BsFillCalendarEventFill />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/youtube-content'>
            {Item('YouTube Content', videos.length, '#e84118', <BsYoutube />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/projects'>
            {Item('Total Projects', projects.length, '#40739e', <GoGoal />)}
          </Link>
        </Grid>
        <Grid item xs={cardSpacing} sx={{ margin: `0 ${sm ? '2rem' : '0'}` }}>
          <Link href='/software-and-tools'>
            {Item('Total Software & Tools', softwares.length, '#EE5A24', <AiOutlineCloudDownload />)}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );

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
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return extractSourceFrequencyArrayFromPapersArray(papers)[0][opts.seriesIndex] + ' - ' + extractSourceFrequencyArrayFromPapersArray(papers)[1][opts.seriesIndex]
        }
      },
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
    <Grid container>
      <Grid item xs={chartSpacing}>
        <Card elevation={2} sx={{ margin: '1rem', padding: '1rem', borderRadius: '1rem' }}>
          <Typography variant="h6">Research & Articles Sources</Typography>
          <ApexChart options={chartProps.options} series={extractSourceFrequencyArrayFromPapersArray(papers)[1]} type="donut" height={380} />
        </Card>
      </Grid>
    </Grid>
  );

  const test = (
    <Button variant='contained' onClick={async () => {
      const respoinse = await fetch('/api/users/superUser');
      const data = await respoinse.json();

      console.log(data);
    }}>Test</Button>
  );

  return (
    <>
      {papers.length === 0 &&
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc( 100vh - 4rem )' }}>
          <CircularProgress />
        </Box>
      }
      {papers.length !== 0 && grid}
      {papers.length !== 0 && papersGraph}
      {test}
    </>
  )
}

export default Home

