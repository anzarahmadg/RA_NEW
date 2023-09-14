const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString = "Endpoint=sb://eventhubra.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=r6xx66Q08Vc52V6I8gOWHZcgRkYSIX+nG+AEhO9vqZc=";
const eventHubName = "eventhubra";

async function setEvent() {

  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  batch.tryAdd({ body: "First event" });
  batch.tryAdd({ body: "Second event" });
  batch.tryAdd({ body: "Third event" }); 
  batch.tryAdd({ body: "Fourth event" });  
  batch.tryAdd({ body: "Fifth event" });  

  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log("A batch of 5 events have been sent to the event hub");
}

setEvent().catch((err) => {
  console.log("Error occurred: ", err);
});