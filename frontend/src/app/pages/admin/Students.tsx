import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  Dumbbell,
  Edit,
  Trash2
} from "lucide-react";

import { mockStudents } from "../../../services/mockApi";

interface Aluno {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  modalidade?: string;
  status?: string;
}

export function AdminStudents() {

  const navigate = useNavigate();

  const [alunos,setAlunos] = useState<Aluno[]>([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [filterStatus,setFilterStatus] = useState("all");

  const [openModal,setOpenModal] = useState(false);
  const [editingStudent,setEditingStudent] = useState<Aluno | null>(null);

  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [telefone,setTelefone] = useState("");
  const [modalidade,setModalidade] = useState("");

  useEffect(()=>{
    setAlunos(mockStudents);
  },[]);

  function deleteStudent(id:number){
    setAlunos(alunos.filter(a=>a.id!==id));
  }

  function saveStudent(){

    if(editingStudent){

      const updated = alunos.map(a=>
        a.id===editingStudent.id
          ? {...a,nome,email,telefone,modalidade}
          : a
      );

      setAlunos(updated);

    }else{

      const newStudent = {
        id:Date.now(),
        nome,
        email,
        telefone,
        modalidade,
        status:"Ativo"
      };

      setAlunos([...alunos,newStudent]);

    }

    setOpenModal(false);

    setNome("");
    setEmail("");
    setTelefone("");
    setModalidade("");

  }

  const filteredStudents = alunos.filter(student=>{

    const matchesSearch =
      student.nome?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus==="all" || student.status===filterStatus;

    return matchesSearch && matchesStatus;

  });

  return (

<div className="space-y-6">

<div className="flex justify-between items-center">

<h1 className="text-3xl font-bold">
Gestão de Alunos
</h1>

<button
onClick={()=>{
setEditingStudent(null);
setOpenModal(true);
}}
className="bg-primary text-white px-6 py-3 rounded-lg flex gap-2"
>

<Plus className="w-5 h-5"/>

Novo Aluno

</button>

</div>

{/* BUSCA */}

<div className="bg-card border rounded-lg p-4">

<div className="flex gap-4">

<div className="flex-1 relative">

<Search className="absolute left-3 top-3 w-5 h-5"/>

<input
placeholder="Buscar aluno..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="w-full pl-10 p-2 border rounded"
/>

</div>

<select
value={filterStatus}
onChange={(e)=>setFilterStatus(e.target.value)}
className="border p-2 rounded"
>

<option value="all">Todos</option>
<option value="Ativo">Ativo</option>
<option value="Inadimplente">Inadimplente</option>

</select>

</div>

</div>

{/* TABELA */}

<div className="bg-card border rounded-lg overflow-hidden">

<table className="w-full">

<thead className="bg-muted">

<tr>
<th className="p-4 text-left">Nome</th>
<th className="p-4 text-left">Email</th>
<th className="p-4 text-left">Telefone</th>
<th className="p-4 text-left">Modalidade</th>
<th className="p-4 text-left">Status</th>
<th className="p-4">Ações</th>
</tr>

</thead>

<tbody>

{filteredStudents.map(student=>(

<tr key={student.id} className="border-b">

<td className="p-4">{student.nome}</td>

<td className="p-4">{student.email}</td>

<td className="p-4">{student.telefone}</td>

<td className="p-4">{student.modalidade}</td>

<td className="p-4">{student.status}</td>

<td className="p-4 flex gap-2">

<button
onClick={()=>navigate(`/admin/students/performance?id=${student.id}`)}
>

<TrendingUp className="w-4 h-4"/>

</button>

<button
onClick={()=>navigate(`/admin/workouts/builder?studentId=${student.id}`)}
>

<Dumbbell className="w-4 h-4"/>

</button>

<button
onClick={()=>{
setEditingStudent(student);
setNome(student.nome || "");
setEmail(student.email || "");
setTelefone(student.telefone || "");
setModalidade(student.modalidade || "");
setOpenModal(true);
}}
>

<Edit className="w-4 h-4"/>

</button>

<button
onClick={()=>deleteStudent(student.id)}
>

<Trash2 className="w-4 h-4 text-red-500"/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* MODAL */}

{openModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white p-6 rounded-lg w-[400px] space-y-4">

<h2 className="text-xl font-bold">

{editingStudent ? "Editar Aluno" : "Novo Aluno"}

</h2>

<input
placeholder="Nome"
value={nome}
onChange={(e)=>setNome(e.target.value)}
className="w-full border p-2 rounded"
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-2 rounded"
/>

<input
placeholder="Telefone"
value={telefone}
onChange={(e)=>setTelefone(e.target.value)}
className="w-full border p-2 rounded"
/>

<input
placeholder="Modalidade"
value={modalidade}
onChange={(e)=>setModalidade(e.target.value)}
className="w-full border p-2 rounded"
/>

<div className="flex justify-end gap-2">

<button
onClick={()=>setOpenModal(false)}
className="px-4 py-2 border rounded"
>

Cancelar

</button>

<button
onClick={saveStudent}
className="bg-primary text-white px-4 py-2 rounded"
>

Salvar

</button>

</div>

</div>

</div>

)}

</div>

  );
}