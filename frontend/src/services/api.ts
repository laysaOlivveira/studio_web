
export async function apiPost(path: string, data: any) {
  await new Promise(r=>setTimeout(r,300));

  if(path.includes("login")){
    if(data.email === "admin@studio.com"){
      return {token:"fake-admin", user:{name:"Admin", role:"admin"}};
    }
    if(data.email === "aluno@studio.com"){
      return {token:"fake-student", user:{name:"Aluno", role:"student"}};
    }
  }

  return {ok:true};
}

export async function apiGet(path:string){
  await new Promise(r=>setTimeout(r,200));

  if(path.includes("dashboard")){
    return {
      students: 24,
      workouts: 12,
      revenue: 5400
    }
  }

  if(path.includes("students")){
    return [
      {id:1,name:"Carlos Silva",status:"Ativo"},
      {id:2,name:"Mariana Souza",status:"Ativo"},
      {id:3,name:"Pedro Santos",status:"Inativo"}
    ]
  }

  return [];
}
