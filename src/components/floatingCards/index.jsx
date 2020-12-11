import React from "react";
import { useHistory } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#fff",
    },
    "&:hover": {
      backgroundColor: "#D6DBDF",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#3B3B3B",
      },
    },
  },
}))(MenuItem);

export const FloatingMenu = ({
  option1,
  option2,
  icon1,
  icon2,
  action1,
  action2,
  mainIcon,
  image,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  // const avatar =
  //   image ||
  //   "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg";
  let avatar = image;
  if (avatar === null) {
    avatar =
      "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg";
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <li onClick={handleClick}>
        {mainIcon}
        {avatar && (
          <img className="profilePic" src={avatar} alt="profile pic" />
        )}
      </li>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => history.push(action1)}>
          <ListItemIcon>{icon1}</ListItemIcon>
          <ListItemText primary={option1}></ListItemText>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() =>
            typeof action2 === "string" ? history.push(action2) : action2()
          }
        >
          <ListItemIcon>{icon2}</ListItemIcon>
          <ListItemText primary={option2} />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};