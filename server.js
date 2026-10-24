const express = require("express");
const app = express();

app.use(express.json());

let students = [];

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  students.push(req.body);
  res.status(201).json(req.body);
});

app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = { ...students[index], ...req.body, id };
  res.json(students[index]);
});
app.patch("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students[index] = {
    ...students[index],
    ...req.body,
    id
  };

  res.json(students[index]);
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});








// //docker commands
// docker build -t student .
// docker run -d  -p 3000:3000 student
// curl http://localhost:3000/students
// docker rm -f student

// //k8s
// kubectl apply -f deployment.yml
// kubectl apply -f service.yml
// kubectl get pods
// kubectl get all
// kubectl logs deploy/student
// kubectl port-forward svc/student 3000:3000



// 1. Create a Pod
// kubectl run mypod --image=nginx:latest --port=80


// Verify the Pod:
// kubectl get pods
// kubectl describe pod mypod


// 2. Create a Deployment
// kubectl create deployment mydeployment --image=nginx:latest


// Verify the Deployment:
// kubectl get deployments
// kubectl get pods


// Scale to 3 Replicas:
// kubectl scale deployment mydeployment --replicas=3


// 3. Create a Service
// kubectl expose deployment mydeployment --type=NodePort --port=80


// Verify the Service:
// kubectl get services
// kubectl describe service mydeployment


// 4. View All Resources
// kubectl get all


// 5. Delete the Resources
// kubectl delete service mydeployment
// kubectl delete deployment mydeployment
// kubectl delete pod mypod