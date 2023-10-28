export default function Page({ params } : { 
  params: { id: string }  
}) {
  return <h2>You are currently reading blog: {params.id} </h2>;
}