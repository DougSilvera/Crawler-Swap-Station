SELECT Id, UserId, DateCreated, Title, Body, Price FROM Listing ORDER BY DateCreated DESC;

SELECT l.Id, l.UserId, l.DateCreated, l.Title, l.Body, l.Price, u.DisplayName FROM Listing l LEFT JOIN UserProfile u ON l.UserId = u.Id WHERE l.Id= 1; 