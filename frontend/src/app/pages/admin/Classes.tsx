import { Plus, Users, Megaphone, Trash2 } from "lucide-react";
import { useState } from "react";

interface Class {
  id: number;
  name: string;
  schedule: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  status: "Ativa" | "Completa" | "Aguardando";
}

export function AdminClasses() {

  const [classes,setClasses] = useState<Class[]>([
    {
      id:1,
      name:"Funcional Manhã",
      schedule:"Seg-Sex 07:00",
      instructor:"Adriano Oliveira",
      capacity:15,
      enrolled:12,
      status:"Ativa"
    },
    {
      id:2,
      name:"Funcional Noite",
      schedule:"Seg-Sex 19:00",
      instructor:"Adriano Oliveira",
      capacity:15,
      enrolled:15,
      status:"Completa"
    }
  ])

  function deleteClass(id:number){
    setClasses(classes.filter(c=>c.id!==id))
  }

  return(

    <div className="space-y-6">

      <div className="flex justify-between">

        <h1 className="text-3xl font-bold">
          Gestão de Turmas
        </h1>

        <button className="bg-primary text-white px-6 py-3 rounded-lg flex gap-2">
          <Plus className="w-5 h-5"/>
          Nova Turma
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {classes.map((classItem)=>(

          <div key={classItem.id} className="bg-card border rounded-lg p-6">

            <h3 className="font-bold text-lg">
              {classItem.name}
            </h3>

            <p className="text-muted-foreground mb-2">
              {classItem.schedule}
            </p>

            <p className="text-sm">
              Instrutor: {classItem.instructor}
            </p>

            <p className="text-sm">
              {classItem.enrolled}/{classItem.capacity} alunos
            </p>

            <div className="flex gap-2 mt-4">

              <button className="flex-1 bg-muted p-2 rounded flex gap-2 justify-center">
                <Users className="w-4 h-4"/>
                Ver alunos
              </button>

              <button className="flex-1 bg-accent text-white p-2 rounded flex gap-2 justify-center">
                <Megaphone className="w-4 h-4"/>
                Avisar
              </button>

              <button onClick={()=>deleteClass(classItem.id)}>
                <Trash2 className="w-4 h-4 text-red-500"/>
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}