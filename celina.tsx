// Aucun élément sélectionné

// Aller au contenu
// Utiliser Gmail avec un lecteur d'écran
// Activez les notifications sur le bureau pour Gmail.
//    OK  Non, merci
// Conversations
// 0,38 Go utilisés sur 15 Go
// Conditions d'utilisation · Confidentialité · Règlement du programme
// Dernière activité sur le compte : il y a 6 jours
// Détails
// import * as React from "react";
// import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import { TextField } from "@mui/material";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import { FixedSizeList } from "react-window";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   Avatar,
//   Checkbox,
//   InputBase,
//   Stack,
//   alpha,
//   styled,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import PaletteIcon from "@mui/icons-material/Palette";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { deepOrange, deepPurple } from "@mui/material/colors";
// import { DataGrid } from "@mui/x-data-grid";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));
// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [content, setContent] = React.useState("Home");

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleListItemClick = (newContent) => {
//     setContent(newContent);
//   };
//   const columns = [
//     {
//       field: "thème",
//       headerName: "Noms des thèmes",
//       description: "This column has a value getter and is not sortable.",
//       sortable: false,
//       width: 160,
//     },
//   ];

//   const rows = [
//     { id: 1, thème: "thème1" },
//     { id: 2, thème: "thème2" },
//     { id: 3, thème: "thème3" },
//     { id: 4, thème: "thème4" },
//     { id: 5, thème: "thème5" },
//     { id: 6, thème: "thème6" },
//     { id: 7, thème: "thème7" },
//     { id: 8, thème: "thème8" },
//     { id: 9, thème: "thème9" },
//     { id: 10, thème: "thème10" },
//     { id: 11, thème: "thème11" },
//     { id: 12, thème: "thème12" },
//   ];

//   function renderRow(props) {
//     const { index, style } = props;

//     return (
//       <ListItem style={style} key={index} component="div" disablePadding>
//         <ListItemButton>
//           <ListItemText primary={`Theme ${index + 1}`} />
//           <Checkbox />
//         </ListItemButton>
//       </ListItem>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         Color="#4C0086"
//         position="fixed"
//         open={open}
//         sx={{ backgroundColor: "#4C0086" }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box display="flex">
//             <CalendarMonthIcon
//               sx={{ m: 1, color: "white", fontSize: "30px", ml: 0 }}
//             ></CalendarMonthIcon>
//             <Typography
//               sx={{
//                 mr: 1,
//                 display: { xs: "none", md: "flex" },
//                 fontWeight: 90,
//                 marginTop: "14px",
//                 marginLeft: "0px",
//                 color: "white",
//                 textDecoration: "none",
//               }}
//             >
//               SoutenancePlan
//             </Typography>
//           </Box>
//           <Box flexGrow={1} />
//           <Search sx={{ borderRadius: 10 }}>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search>

//           <Stack direction={"row"}>
//             <IconButton color="inherit" sx={{ mr: 2 }}>
//               <NotificationsNoneIcon />
//             </IconButton>
//             <Box flexGrow={1} />
//             <Avatar
//               sx={{
//                 mx: "auto",
//                 width: 38,
//                 height: 38,
//                 my: 1,
//                 mr: 1,
//               }}
//               alt="Remy Sharp"
//               src="https://th.bing.com/th/id/R.f258b58375804919500a957a5f9e1509?rik=ptzozz%2bimGMfOg&pid=ImgRaw&r=0"
//             />
//             <Stack direction={"column"}>
//               <Typography
//                 align="center"
//                 sx={{ fontSize: 16, mt: 0.5, ml: 1, fontFamily: "monospace" }}
//               >
//                 Nom Prenom
//               </Typography>
//               <Typography
//                 align="center"
//                 sx={{ fontSize: 13, mt: 0, fontFamily: "monospace" }}
//               >
//                 Enseignant
//               </Typography>
//             </Stack>
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       <div sx={{ backgroundColor: "#4C0086" }}>
//         <Drawer variant="permanent" open={open}>
//           <DrawerHeader>
//             <IconButton onClick={handleDrawerClose}>
//               {theme.direction === "rtl" ? (
//                 <ChevronRightIcon />
//               ) : (
//                 <ChevronLeftIcon />
//               )}
//             </IconButton>
//           </DrawerHeader>

//           <Avatar
//             sx={{
//               mx: "auto",
//               width: open ? 88 : 49,
//               height: open ? 88 : 49,
//               my: 0.8,
//               mt: 2,
//               transition: "0.25s",
//             }}
//             alt="Remy Sharp"
//             src="https://th.bing.com/th/id/R.f258b58375804919500a957a5f9e1509?rik=ptzozz%2bimGMfOg&pid=ImgRaw&r=0"
//           />
//           <Typography
//             variant="h5"
//             component="a"
//             align="center"
//             sx={{
//               fontSize: open ? 20 : 0,
//               transition: "0.25s",
//               fontFamily: "monospace",
//               color: "#4C0086",
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//             }}
//           >
//             {" "}
//             Welcome Back !{" "}
//           </Typography>
//           <Typography
//             align="center"
//             sx={{
//               fontSize: open ? 16 : 0,
//               my: 1,
//               transition: "0.25s",
//               color: "#9654B8",
//               fontFamily: "monospace",
//             }}
//           >
//             {" "}
//             Enseignant
//           </Typography>
//           <Divider />
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton onClick={() => handleListItemClick("Home")}>
//                 <ListItemIcon>
//                   <HomeIcon sx={{ color: "#4C0086" }}></HomeIcon>
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Home"
//                   sx={{ color: "#4C0086", fontFamily: "monospace" }}
//                 />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton onClick={() => handleListItemClick("mesthèmes")}>
//                 <ListItemIcon>
//                   <AutoFixNormalIcon
//                     sx={{ color: "#4C0086" }}
//                   ></AutoFixNormalIcon>
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Mes thèmes"
//                   sx={{ color: "#4C0086", fontFamily: "monospace" }}
//                 />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton onClick={() => handleListItemClick("Themes")}>
//                 <ListItemIcon>
//                   <PaletteIcon sx={{ color: "#4C0086" }} />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Thèmes"
//                   sx={{ color: "#4C0086", fontFamily: "monospace" }}
//                 />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={() => handleListItemClick("Indisponibilité")}
//               >
//                 <ListItemIcon>
//                   <PendingActionsIcon
//                     sx={{ color: "#4C0086" }}
//                   ></PendingActionsIcon>
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Indisponibilité"
//                   sx={{ color: "#4C0086", fontFamily: "monospace" }}
//                 />
//               </ListItemButton>
//             </ListItem>

//             <ListItem disablePadding>
//               <ListItemButton onClick={() => handleListItemClick("Calendrier")}>
//                 <ListItemIcon>
//                   <CalendarMonthIcon sx={{ color: "#4C0086" }} />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Calendrier"
//                   sx={{ color: "#4C0086", fontFamily: "monospace" }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </List>

//           <Divider />

//           <List>
//             <ListItem disablePadding sx={{ mt: open ? 25 : 0 }}>
//               <ListItemButton onClick={() => handleListItemClick("Log Out")}>
//                 <ListItemIcon>
//                   <LogoutIcon position="fixed" sx={{ color: "#4C0086" }} />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary="Log Out"
//                   sx={{ color: "#4C0086", fontFamily: "monospace" }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Drawer>
//       </div>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />

//         {/* Afficher le contenu différent en fonction de l'état */}
//         {content === "Home" && (
//           <Box>
//             <Typography
//               sx={{
//                 color: "#9654B8",
//                 fontFamily: "monospace",
//                 mt: 2,
//                 fontSize: 30,
//                 textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//               }}
//             >
//               Check News !{" "}
//             </Typography>

//             <Avatar
//               sx={{
//                 borderRadius: 1,
//                 bgcolor: deepPurple[200],
//                 mx: "auto",
//                 width: open ? 1200 : 1400,
//                 height: 105,
//                 mt: 4,
//                 mr: 0,
//                 ml: 5,
//                 transition: "0.25s",
//               }}
//               variant="square"
//             >
//               <Typography
//                 sx={{
//                   color: "#3D007B",
//                   fontFamily: "monospace",
//                   mt: 0,
//                   fontSize: 19,
//                   mr: 2,
//                   marginLeft: open ? 3 : 1,
//                   textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//                 }}
//               >
//                 BIENVENUE SUR LA PLATEFROME DE GESTION DES PLANNINGS DES
//                 SOUTENANCES
//               </Typography>

//               <Avatar
//                 Avatar
//                 sx={{
//                   backgroundColor: "#3D007B",
//                   mx: "auto",
//                   width: 140,
//                   height: 140,
//                   my: 0.5,
//                   mt: 1.5,
//                   ml: 30,
//                   mr: -9,
//                   transition: "0.25s",
//                 }}
//                 alt="Remy Sharp"
//                 src="https://png.pngtree.com/png-vector/20211209/ourlarge/pngtree-graduation-people-flat-illustration-with-cap-and-diploma-png-image_4053463.png"
//               />
//               <Avatar
//                 Avatar
//                 sx={{
//                   mx: "auto",
//                   width: 120,
//                   height: 120,
//                   my: 0.5,
//                   mt: 1,
//                   mr: -7,
//                   ml: 0,
//                   transition: "0.25s",
//                 }}
//                 alt="Remy Sharp"
//                 src="https://png.pngtree.com/png-clipart/20211219/original/pngtree-graduated-student-standing-and-holding-diplomas-flat-illustration-png-image_6965347.png"
//               />
//               <Avatar
//                 Avatar
//                 sx={{
//                   mx: "auto",
//                   width: 120,
//                   height: 120,
//                   my: 0.5,
//                   mt: 1.5,
//                   mr: 0,
//                   ml: 0,
//                   transition: "0.25s",
//                 }}
//                 alt="Remy Sharp"
//                 src="https://png.pngtree.com/png-clipart/20211219/original/pngtree-happy-graduation-man-holding-diplomas-flat-illustration-free-vector-png-image_6964666.png"
//               />
//             </Avatar>

//             <Box display="flex">
//               <Box display="flow">
//                 <Avatar
//                   sx={{
//                     borderRadius: 1,
//                     bgcolor: "skyblue",
//                     mx: "auto",
//                     width: open ? 570 : 570,
//                     height: 89,
//                     mt: 10,
//                     mr: 0,
//                     ml: 5,
//                     transition: "0.25s",
//                   }}
//                   variant="square"
//                 >
//                   <Typography
//                     sx={{
//                       color: "#3D007B",
//                       fontFamily: "monospace",
//                       mt: 0,
//                       fontSize: 19,
//                       mr: 0,
//                       marginLeft: 7,
//                       textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//                     }}
//                   >
//                     Ajouter un nouveau thème
//                   </Typography>

//                   <Avatar
//                     Avatar
//                     sx={{
//                       backgroundColor: "#3D007B",
//                       mx: "auto",
//                       width: 120,
//                       height: 120,
//                       my: 0.5,
//                       mt: 2.5,
//                       mr: -3,
//                       transition: "0.25s",
//                     }}
//                     alt="Remy Sharp"
//                     src="https://img.freepik.com/free-vector/puzzled-student-making-choice-about-his-future-career-path_179970-636.jpg?size=338&ext=jpg"
//                   />
//                 </Avatar>
//                 <Avatar
//                   sx={{
//                     borderRadius: 1,
//                     bgcolor: deepOrange[50],
//                     mx: "auto",
//                     width: open ? 570 : 570,
//                     height: 89,
//                     mt: 3,
//                     mr: 0,
//                     ml: 5,
//                     transition: "0.25s",
//                   }}
//                   variant="square"
//                 >
//                   <Typography
//                     sx={{
//                       color: "#3D007B",
//                       fontFamily: "monospace",
//                       mt: 0,
//                       fontSize: 19,
//                       mr: 0,
//                       marginLeft: 7,
//                       textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//                     }}
//                   >
//                     Déclarer mes jours d'indisponibilités
//                   </Typography>

//                   <Avatar
//                     Avatar
//                     sx={{
//                       backgroundColor: "#3D007B",
//                       mx: "auto",
//                       width: 110,
//                       height: 110,
//                       my: 0.5,
//                       mt: 0.5,
//                       mr: -2,
//                       transition: "0.25s",
//                     }}
//                     alt="Remy Sharp"
//                     src="https://th.bing.com/th/id/OIP.dc_v4SMLBwmIu1seDz-AJwHaG6?w=900&h=840&rs=1&pid=ImgDetMain"
//                   />
//                 </Avatar>
//                 <Avatar
//                   sx={{
//                     borderRadius: 1,
//                     bgcolor: deepOrange[100],
//                     mx: "auto",
//                     width: open ? 570 : 570,
//                     height: 89,
//                     mt: 3,
//                     mr: 0,
//                     ml: 5,
//                     transition: "0.25s",
//                   }}
//                   variant="square"
//                 >
//                   <Typography
//                     sx={{
//                       color: "#3D007B",
//                       fontFamily: "monospace",
//                       mt: 0,
//                       fontSize: 19,
//                       mr: 0,
//                       marginLeft: 7,
//                       textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//                     }}
//                   >
//                     Voir mes binoms
//                   </Typography>

//                   <Avatar
//                     Avatar
//                     sx={{
//                       backgroundColor: "#3D007B",
//                       mx: "auto",
//                       width: 110,
//                       height: 110,
//                       my: 0.5,
//                       mt: 0.5,
//                       mr: -2,
//                       transition: "0.25s",
//                     }}
//                     alt="Remy Sharp"
//                     src="https://png.pngtree.com/png-clipart/20210826/ourlarge/pngtree-2020-graduation-season-hand-drawn-illustration-elements-png-image_3459262.jpg"
//                   />
//                 </Avatar>
//               </Box>
//               <Avatar
//                 sx={{
//                   mx: "auto",
//                   width: 454,
//                   height: 400,
//                   my: 0.5,
//                   mt: 7,
//                   mr: 0,
//                   ml: open ? 9 : 20,
//                   transition: "0.25s",
//                 }}
//                 alt="Remy Sharp"
//                 src="https://netcombcc.com/wp-content/uploads/2021/01/Icono-65-1.png"
//                 variant="square"
//               ></Avatar>
//             </Box>
//           </Box>
//         )}

//         {content === "Themes" && (
//           <Typography>
//             <Typography
//               sx={{
//                 color: "#9654B8",
//                 fontFamily: "monospace",
//                 mt: 0,
//                 fontSize: 20,
//                 textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//               }}
//             >
//               La liste des thèmes disponible :
//             </Typography>

//             <div style={{ height: 400, width: open ? "99%" : "100%" }}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{
//                   pagination: {
//                     paginationModel: { page: 0, pageSize: 5 },
//                   },
//                 }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//               />
//             </div>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 bgcolor: deepPurple[200],
//                 mt: 2,
//                 mb: 2,
//                 ml: 140,
//                 color: "secondary",
//               }}
//             >
//               Ajouter un thème
//             </Button>
//           </Typography>
//         )}

//         {content === "Calendrier" && (
//           <Typography>
//             <Typography
//               sx={{
//                 color: "#9654B8",
//                 fontFamily: "monospace",
//                 mt: 0,
//                 fontSize: 20,
//                 textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//               }}
//             >
//               Planning des Soutenances :
//             </Typography>
//           </Typography>
//         )}
//         {content === "mesthèmes" && (
//           <div>
//             <Box
//               sx={{
//                 width: "100%",
//                 height: 400,
//                 maxWidth: 360,
//                 bgcolor: "background.paper",
//               }}
//             >
//               <FixedSizeList
//                 height={550}
//                 width={open ? 1300 : 1500}
//                 itemSize={46}
//                 itemCount={15}
//                 overscanCount={5}
//               >
//                 {renderRow}
//               </FixedSizeList>
//               <br />
//             </Box>
//             <Box display={"flex"}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   bgcolor: "#E85F5F",
//                   mt: 26,
//                   ml: open ? 130 : 155,
//                   fontSize: 13,
//                   color: "#fff",
//                 }}
//               >
//                 Supprimer
//               </Button>
//               <Link onClick={() => handleListItemClick("ajouter")}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#7853BA",
//                     mt: 26,
//                     ml: 2,
//                     fontSize: 13,
//                     color: "#fff",
//                   }}
//                 >
//                   Ajouter
//                 </Button>
//               </Link>
//             </Box>
//           </div>
//         )}
//         {content === "ajouter" && (
//           <div>
//             <Typography
//               sx={{
//                 color: "#9654B8",
//                 fontFamily: "monospace",
//                 mt: 10,
//                 fontSize: 30,
//                 textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//                 ml: 10,
//               }}
//             >
//               Ajouter un thème :
//             </Typography>
//             <Box display={"flex"}>
//               <Box display={"flow"} sx={{ mt: 5, ml: 10 }}>
//                 <br />
//                 <TextField
//                   id="filled-multiline-static"
//                   label="Nom de thème"
//                   multiline
//                   rows={4}
//                   sx={{ width: 460, mt: 4 }}
//                   variant="filled"
//                 />
//                 <br />
//                 <TextField
//                   id="theme-name"
//                   label="Spécialité"
//                   variant="filled"
//                   fullWidth
//                   sx={{ mt: 2, width: 460 }}
//                 />
//                 <br />

//                 <br />
//                 <Box display={"flex"}>
//                   <Link onClick={() => handleListItemClick("mesthèmes")}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       sx={{
//                         bgcolor: "#E85F5F",
//                         mt: 4,
//                         ml: 17,
//                         fontSize: 13,
//                         color: "#fff",
//                       }}
//                     >
//                       Annuler
//                     </Button>
//                   </Link>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     sx={{
//                       bgcolor: "#13D802",
//                       mt: 4,
//                       ml: 1,
//                       fontSize: 13,
//                       color: "#fff",
//                     }}
//                   >
//                     Valider
//                   </Button>
//                 </Box>
//               </Box>
//               <Avatar
//                 sx={{
//                   mx: "auto",
//                   width: 570,
//                   height: 390,
//                   my: 0.5,
//                   mt: 5,
//                   mr: 0,
//                   ml: 17,
//                   transition: "0.25s",
//                 }}
//                 alt="Remy Sharp"
//                 src="https://th.bing.com/th/id/OIP._R0QsQgYxs5aCz--FmGHFgHaE8?w=2760&h=1840&rs=1&pid=ImgDetMain"
//                 variant="square"
//               ></Avatar>
//             </Box>
//           </div>
//         )}
//       </Box>
//     </Box>
//   );
// }
// Enseignant.txt
// Affichage de Enseignant.txt en cours...
