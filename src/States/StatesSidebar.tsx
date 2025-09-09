import { useState } from "react";

export const StatesSidebar = () => {
  const [EditPhotoperfil, setEditPhotoperfil] = useState(false);
  const [EditNameporfil, setEditNameporfil] = useState(false);
  const [EditDescriptionporfil, setEditDescriptionporfil] = useState(false);

  const [NameUserUpdate, setNameUserUpdate] = useState<string>("");
  const [DescriptionUserUpdate,setDescriptionUserUpdate] =useState<string>("")
  const [Showwindow,setShowwindow]= useState<string>("Profile")

  return {
    EditPhotoperfil,
    setEditPhotoperfil,
    EditNameporfil,
    setEditNameporfil,
    EditDescriptionporfil,
    setEditDescriptionporfil,
    NameUserUpdate,
    setNameUserUpdate,
    DescriptionUserUpdate,
    setDescriptionUserUpdate,
    Showwindow,
    setShowwindow
  };
};
